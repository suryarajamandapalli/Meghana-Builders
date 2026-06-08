"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useCMS } from "@/context/CMSContext";

export default function ThreeDBuilding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { cmsData } = useCMS();
  const [selectedPart, setSelectedPart] = useState<string>("Overview");

  // Detailed descriptions of the villa parts
  const villaParts: Record<string, string> = {
    Overview: "A premium Vastu-compliant 3BHK luxury villa. Features modern cantilevered architecture, ecological energy management, and premium finishes.",
    "Structure & Foundation": "Seismic-resistant RCC framed structure with high-grade steel. Built on solid soil-tested foundation engineering for multi-generation durability.",
    "Cantilever Balcony": "Modern double-height structural cantilever offering panoramic views. Styled with structural glass railings and premium steel framing.",
    "Eco-Friendly Glass": "High-performance low-E double-glazed windows reducing thermal footprint while maximizing natural light.",
    "Vastu Entrance": "Designed along the East-West axis to capture positive energy flow. Double-height main door entry styled in seasoned teak wood.",
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // Get theme color
    const themeColor = cmsData.primaryColor || "#11385B";
    const baseColor = new THREE.Color(themeColor);

    // Scene creation
    const scene = new THREE.Scene();
    // Dark background for contrast
    scene.background = null; // transparent to inherit website's dark background

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(7, 6, 8);
    camera.lookAt(0, 0.5, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(baseColor, 0.8);
    dirLight2.position.set(-5, 5, -5);
    scene.add(dirLight2);

    // Architectural Ground Grid
    const gridHelper = new THREE.GridHelper(12, 24, baseColor, 0x334155);
    gridHelper.position.y = -0.5;
    if (Array.isArray(gridHelper.material)) {
      gridHelper.material.forEach((m) => {
        m.transparent = true;
        m.opacity = 0.25;
      });
    } else {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.25;
    }
    scene.add(gridHelper);

    // Create the Villa 3D Model Group
    const villaGroup = new THREE.Group();
    scene.add(villaGroup);

    // Materials
    // Holographic fill material
    const fillMaterial = new THREE.MeshPhongMaterial({
      color: baseColor,
      transparent: true,
      opacity: 0.08,
      shininess: 90,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    // Sharp glowing wireframe lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x60a5fa, // light sky blue for wireframe glow
      transparent: true,
      opacity: 0.6,
    });

    // Secondary line material for interior divisions
    const innerLineMaterial = new THREE.LineBasicMaterial({
      color: baseColor,
      transparent: true,
      opacity: 0.3,
    });

    // Helper to build a wireframe box with face meshes
    const createArchBlock = (w: number, h: number, d: number, x: number, y: number, z: number) => {
      const geom = new THREE.BoxGeometry(w, h, d);
      
      // Face mesh (transparent fill)
      const mesh = new THREE.Mesh(geom, fillMaterial);
      mesh.position.set(x, y, z);
      villaGroup.add(mesh);

      // Edges (wireframe outline)
      const edges = new THREE.EdgesGeometry(geom);
      const line = new THREE.LineSegments(edges, lineMaterial);
      line.position.set(x, y, z);
      villaGroup.add(line);

      return { mesh, line };
    };

    // 1. Foundation slab
    createArchBlock(4.2, 0.15, 5.2, 0, -0.425, 0);

    // 2. First Floor Main block
    createArchBlock(3.6, 1.4, 4.4, -0.1, 0.35, -0.1);

    // 3. Second Floor Cantilever block (shifted forward and right for architectural dynamism)
    const upperFloor = createArchBlock(3.2, 1.3, 4.0, 0.3, 1.7, 0.3);

    // 4. Balcony Cantilever extension (structural frame)
    createArchBlock(1.5, 0.1, 1.8, 1.35, 1.05, 1.6);
    // Balcony Railings
    createArchBlock(1.5, 0.8, 0.05, 1.35, 1.5, 2.5); // front glass
    createArchBlock(0.05, 0.8, 1.8, 2.1, 1.5, 1.6); // right side glass

    // 5. Entrance Column Pillar (tall vertical)
    createArchBlock(0.2, 2.4, 0.2, -1.6, 0.7, 1.8);
    // Entrance Canopy Roof
    createArchBlock(1.2, 0.1, 1.8, -1.2, 1.9, 1.5);

    // 6. Architectural staircase lines
    const stepsGroup = new THREE.Group();
    stepsGroup.position.set(-1.2, -0.4, 2.3);
    for (let i = 0; i < 5; i++) {
      const stepGeom = new THREE.BoxGeometry(1.0, 0.1, 0.25);
      const stepMesh = new THREE.Mesh(stepGeom, fillMaterial);
      stepMesh.position.set(0, i * 0.1, -i * 0.2);
      stepsGroup.add(stepMesh);

      const stepEdges = new THREE.EdgesGeometry(stepGeom);
      const stepLine = new THREE.LineSegments(stepEdges, innerLineMaterial);
      stepLine.position.set(0, i * 0.1, -i * 0.2);
      stepsGroup.add(stepLine);
    }
    villaGroup.add(stepsGroup);

    // 7. Interior partition details / columns (visible inside wireframe)
    // Floor slab separator
    createArchBlock(3.6, 0.1, 4.4, -0.1, 1.05, -0.1);
    // Columns
    createArchBlock(0.15, 1.3, 0.15, -1.7, 0.35, -2.1);
    createArchBlock(0.15, 1.3, 0.15, 1.5, 0.35, -2.1);
    createArchBlock(0.15, 1.3, 0.15, 1.5, 0.35, 1.9);

    // 8. Add circular wireframe details (representing ecological landscape / trees)
    const addTree = (tx: number, tz: number, scale: number) => {
      const trunkGeom = new THREE.CylinderGeometry(0.05, 0.08, 1.2, 6);
      const trunkMesh = new THREE.Mesh(trunkGeom, fillMaterial);
      trunkMesh.position.set(tx, 0.1, tz);
      villaGroup.add(trunkMesh);

      const trunkLine = new THREE.LineSegments(new THREE.EdgesGeometry(trunkGeom), innerLineMaterial);
      trunkLine.position.set(tx, 0.1, tz);
      villaGroup.add(trunkLine);

      const leavesGeom = new THREE.IcosahedronGeometry(0.6, 1);
      const leavesMesh = new THREE.Mesh(leavesGeom, fillMaterial);
      leavesMesh.position.set(tx, 0.9, tz);
      villaGroup.add(leavesMesh);

      const leavesLine = new THREE.LineSegments(new THREE.EdgesGeometry(leavesGeom), lineMaterial);
      leavesLine.position.set(tx, 0.9, tz);
      villaGroup.add(leavesLine);
    };

    addTree(-2.8, -1.5, 1);
    addTree(2.8, -2.2, 0.8);
    addTree(-2.5, 1.8, 0.7);

    // Hover mouse coordinates tracking
    let targetRotationX = 0.15;
    let targetRotationY = -0.45;
    let currentRotationX = 0.15;
    let currentRotationY = -0.45;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Restrict range of tilting
      targetRotationY = x * 0.6 - 0.45;
      targetRotationX = y * 0.4 + 0.15;
    };

    // Scroll coordinate tracking for dynamic zooms/rotations
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Render / Animation Loop
    let animationFrameId: number;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth interpolation for mouse movements
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;

      villaGroup.rotation.x = currentRotationX;
      villaGroup.rotation.y = currentRotationY;

      // Scroll-driven camera response
      // Slowly orbit or adjust camera height and zoom
      const scrollFactor = scrollY * 0.0015;
      camera.position.y = 6 + Math.sin(scrollFactor) * 1.5;
      camera.position.x = 7 * Math.cos(scrollFactor) + 2 * Math.sin(scrollFactor);
      camera.position.z = 8 * Math.sin(scrollFactor) + 6 * Math.cos(scrollFactor);
      camera.lookAt(0, 0.7, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [cmsData.primaryColor]);

  return (
    <section className="relative w-full min-h-[90vh] bg-[#070b13] flex flex-col items-center justify-center py-24 px-6 lg:px-12 border-b border-white/5 overflow-hidden">
      {/* Absolute futuristic HUD elements */}
      <div className="absolute top-8 left-8 z-10 pointer-events-none space-y-1">
        <span className="text-[10px] text-sky-400 font-bold uppercase tracking-[0.3em] block">
          Interactive Architecture Model
        </span>
        <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight uppercase">
          VILLA BLUEPRINT 3D
        </h2>
        <div className="w-12 h-[1px] bg-white/20 mt-2" />
      </div>

      <div className="absolute bottom-8 right-8 z-10 pointer-events-none text-right text-[9px] text-white/30 tracking-[0.2em] font-semibold uppercase">
        <span>Three.js Engine v0.184 // WebGL 2.0</span>
      </div>

      {/* Grid Layout containing Canvas & HUD Controller */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto w-full relative z-10">
        
        {/* HUD Control Panel (Left 4 columns) */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-center order-2 lg:order-1">
          <div className="space-y-2">
            <span className="text-xs uppercase text-sky-400 font-bold tracking-widest block">
              Structural Components
            </span>
            <p className="text-xs text-white/50 leading-relaxed font-light">
              Interact with the 3D model. Use your mouse to rotate/tilt, or scroll the page to orbit the camera blueprint.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {Object.keys(villaParts).map((partName) => (
              <button
                key={partName}
                onClick={() => setSelectedPart(partName)}
                className={`w-full text-left px-5 py-3.5 border transition-all duration-300 rounded-lg flex flex-col gap-1 cursor-pointer ${
                  selectedPart === partName
                    ? "bg-white/5 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                    : "bg-transparent border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {partName}
                  </span>
                  {selectedPart === partName && (
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                  )}
                </div>
                {selectedPart === partName && (
                  <p className="text-[10px] text-white/60 leading-relaxed font-light mt-1.5 animate-fadeIn">
                    {villaParts[partName]}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Canvas viewport (Right 8 columns) */}
        <div
          ref={containerRef}
          className="lg:col-span-8 w-full aspect-[4/3] min-h-[350px] lg:min-h-[500px] relative order-1 lg:order-2 bg-gradient-to-br from-white/[0.01] to-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center shadow-inner"
        >
          {/* Cybernetic grid lines inside container */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-white/5" />
            <div className="absolute top-0 bottom-0 left-2/4 w-[1px] bg-white/5" />
            <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-white/5" />
            <div className="absolute left-0 right-0 top-1/4 h-[1px] bg-white/5" />
            <div className="absolute left-0 right-0 top-2/4 h-[1px] bg-white/5" />
            <div className="absolute left-0 right-0 top-3/4 h-[1px] bg-white/5" />
          </div>

          <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

          {/* Hologram loading ring overlay */}
          <div className="absolute bottom-6 left-6 pointer-events-none flex items-center gap-3">
            <div className="w-4 h-4 rounded-full border border-sky-400/30 border-t-sky-400 animate-spin" />
            <span className="text-[9px] text-white/40 tracking-[0.2em] font-semibold uppercase">
              Hologram Render Active
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
