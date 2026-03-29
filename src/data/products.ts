import { Product } from '../types'

export const products: Product[] = [
  {
    id: '1',
    name: 'Quantum Nexus Pro',
    description: 'Revolutionary quantum computing device with unparalleled processing power. Experience the future of computing with our cutting-edge quantum technology that defies conventional limits.',
    price: 2999.99,
    originalPrice: 3499.99,
    images: [
      '/uploads/quantum-nexus-1.jpg',
      '/uploads/quantum-nexus-2.jpg',
      '/uploads/quantum-nexus-3.jpg',
      '/uploads/quantum-nexus-4.jpg'
    ],
    category: 'electronics',
    subcategory: 'quantum-computing',
    brand: 'QuantumTech',
    rating: 4.8,
    reviewCount: 127,
    inStock: true,
    stockQuantity: 15,
    tags: ['quantum', 'computing', 'ai', 'future-tech', 'premium'],
    specifications: {
      'Processor': 'Quantum Core X7',
      'Memory': '1TB Quantum Memory',
      'Storage': '10TB SSD',
      'Display': '8K Quantum Display',
      'Battery': '48-hour Quantum Battery',
      'Connectivity': 'Quantum Wireless 7.0',
      'OS': 'Quantum OS 2.0',
      'Weight': '2.1 kg',
      'Dimensions': '320x240x25mm'
    },
    features: [
      'Quantum entanglement processing',
      'AI-powered optimization',
      'Holographic interface',
      'Neural network integration',
      'Self-evolving algorithms',
      'Quantum encryption',
      'Multi-dimensional computing'
    ],
    isNew: true,
    isSale: true,
    discount: 14,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-20')
  },
  {
    id: '2',
    name: 'Neural Link Implant',
    description: 'Direct brain-computer interface that revolutionizes human-machine interaction. Connect your mind to the digital world with unprecedented speed and precision.',
    price: 4999.99,
    images: [
      '/uploads/neural-link-1.jpg',
      '/uploads/neural-link-2.jpg',
      '/uploads/neural-link-3.jpg'
    ],
    category: 'medical',
    subcategory: 'neural-tech',
    brand: 'NeuroTech',
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    stockQuantity: 8,
    tags: ['neural', 'implant', 'bci', 'medical', 'revolutionary'],
    specifications: {
      'Compatibility': 'Universal Neural Patterns',
      'Range': 'Global Quantum Network',
      'Power Source': 'Bio-electric',
      'Data Rate': '10 Gbps Neural',
      'Security': 'Quantum Encryption',
      'Lifespan': '50+ years',
      'Installation': 'Non-invasive',
      'Update Method': 'Neural Over-the-Air'
    },
    features: [
      'Direct neural interface',
      'Thought-to-text conversion',
      'Haptic feedback system',
      'Memory enhancement',
      'Skill transfer capability',
      'Emotion recognition',
      'Dream recording'
    ],
    isNew: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-25')
  },
  {
    id: '3',
    name: 'AeroGlide Hoverboard',
    description: 'Experience the ultimate in personal transportation with our magnetic levitation hoverboard. Glide through the air with precision control and unmatched stability.',
    price: 1899.99,
    originalPrice: 2199.99,
    images: [
      '/uploads/aeroglide-1.jpg',
      '/uploads/aeroglide-2.jpg',
      '/uploads/aeroglide-3.jpg',
      '/uploads/aeroglide-4.jpg'
    ],
    category: 'transportation',
    subcategory: 'personal-transport',
    brand: 'AeroTech',
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    stockQuantity: 25,
    tags: ['hoverboard', 'transportation', 'magnetic', 'eco-friendly', 'smart'],
    specifications: {
      'Max Speed': '120 km/h',
      'Range': '200 km',
      'Charging Time': '30 minutes',
      'Weight Capacity': '150 kg',
      'Height Adjustment': '5-30 cm',
      'Terrain': 'All surfaces',
      'Battery': 'Quantum Cell 5000',
      'Connectivity': 'Smartphone App'
    },
    features: [
      'Magnetic levitation technology',
      'AI stability control',
      'Terrain adaptation',
      'Voice commands',
      'Gesture control',
      'Emergency braking',
      'Weather resistance'
    ],
    isSale: true,
    discount: 14,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-03-15')
  },
  {
    id: '4',
    name: 'HoloVision AR Glasses',
    description: 'Immersive augmented reality experience with crystal-clear holographic projections. See the world through a new lens with our advanced AR technology.',
    price: 1299.99,
    images: [
      '/uploads/holovision-1.jpg',
      '/uploads/holovision-2.jpg',
      '/uploads/holovision-3.jpg'
    ],
    category: 'electronics',
    subcategory: 'wearables',
    brand: 'HoloTech',
    rating: 4.6,
    reviewCount: 156,
    inStock: true,
    stockQuantity: 42,
    tags: ['ar', 'glasses', 'holographic', 'wearable', 'immersive'],
    specifications: {
      'Resolution': '8K per eye',
      'Field of View': '120°',
      'Battery Life': '8 hours',
      'Weight': '45g',
      'Frame Material': 'Nano-carbon fiber',
      'Lens Type': 'Waveguide holographic',
      'Connectivity': '5G + WiFi 7',
      'OS': 'HoloOS'
    },
    features: [
      'Holographic display',
      'Eye tracking',
      'Spatial audio',
      'Gesture recognition',
      'Real-time translation',
      'Navigation overlay',
      'Gaming mode'
    ],
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-03-22')
  },
  {
    id: '5',
    name: 'BioRegen Healing Pod',
    description: 'Advanced regenerative medicine pod that accelerates healing and rejuvenation. Experience rapid recovery with our cutting-edge biotechnology.',
    price: 7999.99,
    images: [
      '/uploads/bioregen-1.jpg',
      '/uploads/bioregen-2.jpg',
      '/uploads/bioregen-3.jpg',
      '/uploads/bioregen-4.jpg'
    ],
    category: 'medical',
    subcategory: 'regenerative-medicine',
    brand: 'BioTech',
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
    stockQuantity: 5,
    tags: ['medical', 'regenerative', 'healing', 'biotech', 'premium'],
    specifications: {
      'Treatment Time': '30-120 minutes',
      'Recovery Rate': '5x faster',
      'Cell Regeneration': '98% efficiency',
      'Pain Management': 'Neural blocking',
      'Monitoring': 'Real-time biometric',
      'Compatibility': 'All species',
      'Power Source': 'Fusion cell',
      'Maintenance': 'Self-cleaning'
    },
    features: [
      'Stem cell therapy',
      'Nanobot delivery',
      'Genetic repair',
      'Pain elimination',
      'Muscle regeneration',
      'Organ repair',
      'Anti-aging treatment'
    ],
    isNew: true,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-28')
  },
  {
    id: '6',
    name: 'Quantum Drive Engine',
    description: 'Revolutionary propulsion system that defies physics. Travel faster than light with our quantum entanglement drive technology.',
    price: 14999.99,
    images: [
      '/uploads/quantum-drive-1.jpg',
      '/uploads/quantum-drive-2.jpg',
      '/uploads/quantum-drive-3.jpg'
    ],
    category: 'transportation',
    subcategory: 'space-travel',
    brand: 'QuantumDrive',
    rating: 5.0,
    reviewCount: 23,
    inStock: false,
    stockQuantity: 0,
    tags: ['quantum', 'space', 'ftl', 'propulsion', 'revolutionary'],
    specifications: {
      'Max Velocity': 'FTL (Faster Than Light)',
      'Range': 'Unlimited',
      'Fuel Type': 'Quantum Vacuum Energy',
      'Efficiency': '99.99%',
      'Safety Rating': 'AAA+',
      'Size': '2x2x2 meters',
      'Weight': '500 kg',
      'Integration': 'Universal mounting'
    },
    features: [
      'Quantum entanglement',
      'Zero-point energy',
      'Instantaneous travel',
      'Multi-dimensional navigation',
      'AI pilot assistance',
      'Emergency return protocol',
      'Self-repairing systems'
    ],
    isNew: true,
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-29')
  },
  {
    id: '7',
    name: 'NeuroSync Headset',
    description: 'Synchronize minds across vast distances with our neural link technology. Experience shared consciousness and collective intelligence.',
    price: 3499.99,
    originalPrice: 3999.99,
    images: [
      '/uploads/neurosync-1.jpg',
      '/uploads/neurosync-2.jpg',
      '/uploads/neurosync-3.jpg'
    ],
    category: 'electronics',
    subcategory: 'neural-tech',
    brand: 'NeuroLink',
    rating: 4.8,
    reviewCount: 94,
    inStock: true,
    stockQuantity: 18,
    tags: ['neural', 'sync', 'consciousness', 'telepathy', 'advanced'],
    specifications: {
      'Range': 'Global',
      'Connection Type': 'Quantum neural',
      'Latency': '< 1ms',
      'User Capacity': 'Unlimited',
      'Privacy': 'End-to-end encryption',
      'Compatibility': 'All neural implants',
      'Battery': '72 hours',
      'Interface': 'Thought-based'
    },
    features: [
      'Mind-to-mind communication',
      'Shared experiences',
      'Collective intelligence',
      'Memory sharing',
      'Skill transfer',
      'Language translation',
      'Emotion synchronization'
    ],
    isSale: true,
    discount: 13,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-03-18')
  },
  {
    id: '8',
    name: 'Plasma Shield Generator',
    description: 'Protect yourself with an invisible force field powered by plasma technology. Deflect energy weapons and physical threats with ease.',
    price: 2499.99,
    images: [
      '/uploads/plasma-shield-1.jpg',
      '/uploads/plasma-shield-2.jpg',
      '/uploads/plasma-shield-3.jpg'
    ],
    category: 'security',
    subcategory: 'personal-defense',
    brand: 'PlasmaTech',
    rating: 4.7,
    reviewCount: 112,
    inStock: true,
    stockQuantity: 31,
    tags: ['shield', 'plasma', 'protection', 'defense', 'energy'],
    specifications: {
      'Shield Strength': 'Level 5 energy absorption',
      'Coverage': '360° protection',
      'Duration': '24 hours',
      'Recharge Time': '2 hours',
      'Weight': '200g',
      'Power Source': 'Micro fusion cell',
      'Activation': 'Voice + gesture',
      'Maintenance': 'Self-regulating'
    },
    features: [
      'Plasma force field',
      'Energy weapon deflection',
      'Physical impact absorption',
      'Adaptive shielding',
      'Emergency override',
      'Multi-user linking',
      'Stealth mode'
    ],
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-03-24')
  }
]

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id)
}

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category)
}

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isNew || product.isSale).slice(0, 6)
}

export const getProductsOnSale = (): Product[] => {
  return products.filter(product => product.isSale)
}

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    product.brand.toLowerCase().includes(lowercaseQuery)
  )
}