
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Play, 
  Pause, 
  RotateCcw,
  Maximize,
  Eye,
  Camera,
  ChevronDown
} from 'lucide-react';
import { Button } from '../ui/Button';

// Importar imágenes 360° desde assets
import image360Demo1 from '../../assets/360-demo-1.jpg';
import image360Demo2 from '../../assets/360-demo-2.jpg';

export const Demo360Property = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(image360Demo1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [tilt, setTilt] = useState(0);
  const [showHotspots, setShowHotspots] = useState(true);
  const [gyroEnabled, setGyroEnabled] = useState(false);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(2); // Para calcular el tamaño correcto
  const intervalRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Demo property data
  const demoProperty = {
    id: "DEMO-360",
    title: "Casa Moderna con Vista Panorámica 360°",
    address: "Av. Lafinur 1234",
    city: "San Luis",
    price: "$85.000.000",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    status: "Venta"
  };

  // Imágenes demo precargadas
  const demoImages = [
    { id: 1, src: image360Demo1, name: "Living Principal", description: "Vista panorámica del living principal" },
    { id: 2, src: image360Demo2, name: "Cocina Moderna", description: "Cocina integrada con comedor" }
  ];

  // Hotspots de ejemplo con posiciones angulares CORREGIDAS
  const hotspots = [
    { id: 1, angle: 90, y: 40, title: "Cocina Moderna", description: "Equipada con electrodomésticos de primera línea" },
    { id: 2, angle: 180, y: 50, title: "Living Amplio", description: "Ambiente luminoso con grandes ventanales" },
    { id: 3, angle: 270, y: 35, title: "Vista al Jardín", description: "Hermosa vista al espacio verde privado" },
    { id: 4, angle: 45, y: 45, title: "Entrada Principal", description: "Acceso con diseño moderno" },
    { id: 5, angle: 315, y: 30, title: "Balcón Terraza", description: "Espacio exterior con vista panorámica" },
  ];

  // Función para calcular el aspect ratio correcto de la imagen
  const loadImageDimensions = (imageSrc: string) => {
    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      setImageAspectRatio(aspectRatio);
    };
    img.src = imageSrc;
  };

  // Cargar dimensiones cuando cambia la imagen
  useEffect(() => {
    if (selectedImage) {
      loadImageDimensions(selectedImage);
    }
  }, [selectedImage]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImageSrc = e.target?.result as string;
        setSelectedImage(newImageSrc);
        setRotation(0);
        setTilt(0);
        setZoom(1);
        loadImageDimensions(newImageSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectDemoImage = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setRotation(0);
    setTilt(0);
    setZoom(1);
    setShowImageSelector(false);
    loadImageDimensions(imageSrc);
  };

  const startAutoRotation = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setRotation(prev => prev + 0.3);
      }, 30);
    } else {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const resetRotation = () => {
    setRotation(0);
    setTilt(0);
    setZoom(1);
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Simulación de giroscopio
  const enableGyro = () => {
    if (!gyroEnabled) {
      setGyroEnabled(true);
      const gyroInterval: number = setInterval(() => {
        setRotation(prev => prev + Math.sin(Date.now() * 0.001) * 0.5);
        setTilt(prev => Math.max(-20, Math.min(20, prev + Math.cos(Date.now() * 0.0015) * 0.3)));
      }, 50);
      
      setTimeout(() => {
        clearInterval(gyroInterval);
        setGyroEnabled(false);
      }, 10000);
    }
  };

  // Función para calcular posición correcta de hotspots
  const calculateHotspotPosition = (angle: number, y: number) => {
    // Normalizar ángulo y rotación
    const normalizedAngle = ((angle - rotation) % 360 + 360) % 360;
    
    // Convertir ángulo a posición X (0-100%)
    const x = (normalizedAngle / 360) * 100;
    
    // Ajustar Y con el tilt
    const adjustedY = Math.max(5, Math.min(95, y + (tilt * 0.8)));
    
    // Determinar visibilidad (visible si está en el rango central)
    const isVisible = normalizedAngle < 90 || normalizedAngle > 270;
    
    return { x, y: adjustedY, isVisible };
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Camera className="h-4 w-4 mr-2" />
            DEMO TECNOLOGÍA 360°
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Experiencia Inmersiva con Fotos 360°
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg">
            Sube tus fotos tomadas con Ricoh Theta CS2 y experimenta la realidad virtual en nuestras fichas de propiedades
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Header de la propiedad */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="inline-block bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-bold mb-3">
                    {demoProperty.status}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{demoProperty.title}</h3>
                  <div className="flex items-center text-gray-300 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{demoProperty.address}, {demoProperty.city}</span>
                  </div>
                  <div className="text-3xl font-bold text-amber-400">
                    {demoProperty.price}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400 mb-1">REF: {demoProperty.id}</div>
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    <Eye className="h-4 w-4 inline mr-1" />
                    VISTA 360°
                  </div>
                </div>
              </div>
            </div>

            {/* Visor 360° INMERSIVO */}
            <div className="relative">
              {selectedImage ? (
                <div 
                  ref={containerRef}
                  className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'aspect-video'} overflow-hidden select-none`}
                  style={{ 
                    cursor: isDragging ? 'grabbing' : 'grab',
                    transform: isFullscreen ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  {/* Imagen 360° con resolución y aspect ratio corregidos */}
                  <div 
                    className="w-full h-full transition-transform duration-75"
                    style={{
                      backgroundImage: `url(${selectedImage})`,
                      backgroundSize: `${Math.max(200, imageAspectRatio * 100 * zoom)}% 100%`,
                      backgroundRepeat: 'repeat-x',
                      backgroundPosition: `${rotation % 360}% ${50 + tilt}%`,
                      filter: `brightness(${isFullscreen ? 1.1 : 1}) contrast(${isFullscreen ? 1.05 : 1}) saturate(1.1)`,
                      transform: `perspective(1000px) rotateY(${rotation * 0.02}deg) rotateX(${tilt * 0.5}deg)`,
                      transformStyle: 'preserve-3d'
                    }}
                    onMouseDown={(e) => {
                      setIsDragging(true);
                      const startX = e.clientX;
                      const startY = e.clientY;
                      const startRotation = rotation;
                      const startTilt = tilt;
                      
                      const handleMouseMove = (e: MouseEvent) => {
                        const deltaX = e.clientX - startX;
                        const deltaY = e.clientY - startY;
                        setRotation(startRotation - (deltaX * 0.3));
                        setTilt(Math.max(-30, Math.min(30, startTilt + (deltaY * 0.1))));
                      };
                      
                      const handleMouseUp = () => {
                        setIsDragging(false);
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                      };
                      
                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', handleMouseUp);
                    }}
                    onWheel={(e) => {
                      e.preventDefault();
                      const delta = e.deltaY > 0 ? -0.1 : 0.1;
                      setZoom(prev => Math.max(0.8, Math.min(3, prev + delta)));
                    }}
                    onDoubleClick={() => {
                      setZoom(zoom === 1 ? 2 : 1);
                    }}
                  />

                  {/* Hotspots interactivos CORREGIDOS - se mueven perfectamente con la imagen */}
                  {showHotspots && hotspots.map((hotspot) => {
                    const position = calculateHotspotPosition(hotspot.angle, hotspot.y);
                    
                    return position.isVisible ? (
                      <motion.div
                        key={hotspot.id}
                        className="absolute w-6 h-6 bg-amber-500 rounded-full border-4 border-white shadow-lg cursor-pointer hover:scale-125 transition-all group"
                        style={{
                          left: `${position.x}%`,
                          top: `${position.y}%`,
                          transform: 'translate(-50%, -50%)',
                          zIndex: 10
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          boxShadow: [
                            '0 0 0 0 rgba(245, 158, 11, 0.7)',
                            '0 0 0 10px rgba(245, 158, 11, 0)',
                            '0 0 0 0 rgba(245, 158, 11, 0)'
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black/90 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap max-w-xs">
                            <div className="font-semibold">{hotspot.title}</div>
                            <div className="text-xs text-gray-300">{hotspot.description}</div>
                          </div>
                        </div>
                      </motion.div>
                    ) : null;
                  })}
                  
                  {/* Controles avanzados */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-black/90 backdrop-blur-md rounded-2xl px-6 py-4 flex items-center space-x-4 border border-white/20">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20 hover:scale-110 transition-all"
                        onClick={startAutoRotation}
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20 hover:scale-110 transition-all"
                        onClick={resetRotation}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20 hover:scale-110 transition-all"
                        onClick={() => setShowHotspots(!showHotspots)}
                      >
                        <Eye className={`h-4 w-4 ${showHotspots ? 'text-amber-400' : ''}`} />
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20 hover:scale-110 transition-all"
                        onClick={enableGyro}
                      >
                        <div className={`h-4 w-4 rounded-full border-2 ${gyroEnabled ? 'bg-green-400 border-green-400' : 'border-white'}`} />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20 hover:scale-110 transition-all"
                        onClick={toggleFullscreen}
                      >
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Selector de imágenes demo */}
                  <div className="absolute top-4 left-4">
                    <div className="relative">
                      <Button
                        size="sm"
                        className="bg-black/80 backdrop-blur-md text-white hover:bg-black/90 rounded-lg border border-white/20"
                        onClick={() => setShowImageSelector(!showImageSelector)}
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Imágenes Demo
                        <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showImageSelector ? 'rotate-180' : ''}`} />
                      </Button>
                      
                      {showImageSelector && (
                        <div className="absolute top-full mt-2 left-0 bg-black/90 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden min-w-64">
                          {demoImages.map((img) => (
                            <button
                              key={img.id}
                              className="w-full p-3 text-left hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0"
                              onClick={() => selectDemoImage(img.src)}
                            >
                              <div className="text-white font-medium text-sm">{img.name}</div>
                              <div className="text-gray-300 text-xs mt-1">{img.description}</div>
                            </button>
                          ))}
                          <button
                            className="w-full p-3 text-left hover:bg-white/10 transition-colors text-amber-400"
                            onClick={() => {
                              fileInputRef.current?.click();
                              setShowImageSelector(false);
                            }}
                          >
                            <div className="flex items-center">
                              <Upload className="h-4 w-4 mr-2" />
                              <div>
                                <div className="font-medium text-sm">Subir tu imagen 360°</div>
                                <div className="text-gray-300 text-xs mt-1">Compatible con Ricoh Theta CS2</div>
                              </div>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Instrucciones dinámicas */}
                  <motion.div 
                    className="absolute top-1/2 left-6 transform -translate-y-1/2 text-white/80 text-sm bg-black/60 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isDragging ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <span className="mr-2">🖱️</span>
                        <span>Arrastra para mirar alrededor</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">🔄</span>
                        <span>Rueda del mouse para zoom</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">👆</span>
                        <span>Doble clic para acercar</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Efectos de partículas para mayor inmersión */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -100, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 5,
                        }}
                      />
                    ))}
                  </div>

                  {/* Overlay de carga inmersivo */}
                  {isDragging && (
                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                  )}

                  {/* Botón cerrar pantalla completa mejorado */}
                  {isFullscreen && (
                    <Button
                      className="absolute top-6 left-6 bg-black/80 backdrop-blur-md text-white hover:bg-black/90 rounded-full px-6 py-3 border border-white/20"
                      onClick={toggleFullscreen}
                    >
                      ✕ Salir de VR
                    </Button>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center">
                  <div className="text-center max-w-md">
                    <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-gray-600 mb-2">
                      Experimenta la Vista 360°
                    </h4>
                    <p className="text-gray-500 mb-6">
                      Prueba con nuestras imágenes demo o sube tu propia foto 360° de Ricoh Theta CS2
                    </p>
                    
                    <div className="flex flex-col space-y-3 mb-4">
                      {demoImages.map((img) => (
                        <Button
                          key={img.id}
                          onClick={() => selectDemoImage(img.src)}
                          variant="outline"
                          className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          {img.name}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-300 pt-4">
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Subir tu imagen 360°
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Información de la propiedad */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center">
                  <Bed className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="font-bold text-lg text-gray-800">{demoProperty.bedrooms}</div>
                  <div className="text-sm text-gray-600">Dormitorios</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center">
                  <Bath className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="font-bold text-lg text-gray-800">{demoProperty.bathrooms}</div>
                  <div className="text-sm text-gray-600">Baños</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl text-center">
                  <Square className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="font-bold text-lg text-gray-800">{demoProperty.area}</div>
                  <div className="text-sm text-gray-600">m² cubiertos</div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl text-center">
                  <Eye className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                  <div className="font-bold text-lg text-gray-800">360°</div>
                  <div className="text-sm text-gray-600">Vista inmersiva</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Tecnología 360° - Ricoh Theta CS2
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <strong>Compatibilidad:</strong> Ricoh Theta CS2, Insta360, Samsung Gear 360
                  </div>
                  <div>
                    <strong>Resolución:</strong> Hasta 5376x2688 píxeles
                  </div>
                  <div>
                    <strong>Formatos:</strong> JPEG, PNG, HEIF
                  </div>
                  <div>
                    <strong>Características:</strong> Rotación automática, pantalla completa, controles táctiles
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                  Consultar por WhatsApp
                </Button>
                <Button variant="outline" className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50">
                  Solicitar Recorrido Virtual
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Instrucciones */}
          <motion.div
            className="mt-12 bg-white rounded-xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Cómo funciona la tecnología 360°
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-8 w-8" />
                </div>
                <h4 className="font-semibold text-lg mb-2">1. Captura</h4>
                <p className="text-gray-600">
                  Toma fotos 360° con tu Ricoh Theta CS2 o cámara compatible
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8" />
                </div>
                <h4 className="font-semibold text-lg mb-2">2. Sube</h4>
                <p className="text-gray-600">
                  Carga las imágenes directamente en la ficha de la propiedad
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8" />
                </div>
                <h4 className="font-semibold text-lg mb-2">3. Explora</h4>
                <p className="text-gray-600">
                  Los clientes pueden explorar la propiedad de forma inmersiva
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};