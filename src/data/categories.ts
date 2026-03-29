import { Category } from '../types'

export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Cutting-edge electronic devices and gadgets powered by quantum and AI technologies',
    image: '/uploads/electronics-category.jpg',
    subcategories: [
      { id: 'quantum-computing', name: 'Quantum Computing', productCount: 12 },
      { id: 'neural-tech', name: 'Neural Technology', productCount: 8 },
      { id: 'wearables', name: 'Wearables', productCount: 15 },
      { id: 'smart-home', name: 'Smart Home', productCount: 23 },
      { id: 'communication', name: 'Communication', productCount: 9 }
    ],
    productCount: 67
  },
  {
    id: 'medical',
    name: 'Medical Technology',
    description: 'Advanced medical devices and treatments using biotechnology and nanotechnology',
    image: '/uploads/medical-category.jpg',
    subcategories: [
      { id: 'neural-tech', name: 'Neural Implants', productCount: 6 },
      { id: 'regenerative-medicine', name: 'Regenerative Medicine', productCount: 4 },
      { id: 'diagnostic', name: 'Diagnostic Tools', productCount: 11 },
      { id: 'therapeutic', name: 'Therapeutic Devices', productCount: 8 },
      { id: 'monitoring', name: 'Health Monitoring', productCount: 14 }
    ],
    productCount: 43
  },
  {
    id: 'transportation',
    name: 'Transportation',
    description: 'Revolutionary transportation solutions from personal vehicles to space travel',
    image: '/uploads/transportation-category.jpg',
    subcategories: [
      { id: 'personal-transport', name: 'Personal Transport', productCount: 9 },
      { id: 'space-travel', name: 'Space Travel', productCount: 3 },
      { id: 'public-transport', name: 'Public Transport', productCount: 5 },
      { id: 'autonomous', name: 'Autonomous Vehicles', productCount: 7 },
      { id: 'energy-systems', name: 'Energy Systems', productCount: 12 }
    ],
    productCount: 36
  },
  {
    id: 'security',
    name: 'Security & Defense',
    description: 'Advanced security systems and personal defense technologies',
    image: '/uploads/security-category.jpg',
    subcategories: [
      { id: 'personal-defense', name: 'Personal Defense', productCount: 8 },
      { id: 'cyber-security', name: 'Cyber Security', productCount: 15 },
      { id: 'surveillance', name: 'Surveillance', productCount: 11 },
      { id: 'access-control', name: 'Access Control', productCount: 9 },
      { id: 'emergency', name: 'Emergency Systems', productCount: 6 }
    ],
    productCount: 49
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    description: 'Immersive entertainment experiences with VR, AR, and holographic technologies',
    image: '/uploads/entertainment-category.jpg',
    subcategories: [
      { id: 'vr-ar', name: 'VR/AR Systems', productCount: 13 },
      { id: 'gaming', name: 'Gaming', productCount: 18 },
      { id: 'holographic', name: 'Holographic Displays', productCount: 7 },
      { id: 'audio', name: 'Audio Systems', productCount: 12 },
      { id: 'content-creation', name: 'Content Creation', productCount: 9 }
    ],
    productCount: 59
  },
  {
    id: 'energy',
    name: 'Energy Solutions',
    description: 'Sustainable and advanced energy generation and storage technologies',
    image: '/uploads/energy-category.jpg',
    subcategories: [
      { id: 'renewable', name: 'Renewable Energy', productCount: 16 },
      { id: 'fusion', name: 'Fusion Technology', productCount: 4 },
      { id: 'storage', name: 'Energy Storage', productCount: 11 },
      { id: 'efficiency', name: 'Energy Efficiency', productCount: 8 },
      { id: 'smart-grid', name: 'Smart Grid', productCount: 6 }
    ],
    productCount: 45
  },
  {
    id: 'aerospace',
    name: 'Aerospace',
    description: 'Advanced aerospace technologies for aviation and space exploration',
    image: '/uploads/aerospace-category.jpg',
    subcategories: [
      { id: 'aviation', name: 'Aviation', productCount: 14 },
      { id: 'spacecraft', name: 'Spacecraft', productCount: 8 },
      { id: 'propulsion', name: 'Propulsion Systems', productCount: 5 },
      { id: 'navigation', name: 'Navigation', productCount: 9 },
      { id: 'life-support', name: 'Life Support', productCount: 7 }
    ],
    productCount: 43
  },
  {
    id: 'biotech',
    name: 'Biotechnology',
    description: 'Genetic engineering and biological enhancement technologies',
    image: '/uploads/biotech-category.jpg',
    subcategories: [
      { id: 'genetic', name: 'Genetic Engineering', productCount: 6 },
      { id: 'enhancement', name: 'Human Enhancement', productCount: 9 },
      { id: 'synthetic-biology', name: 'Synthetic Biology', productCount: 5 },
      { id: 'bio-materials', name: 'Bio-materials', productCount: 11 },
      { id: 'bio-computing', name: 'Bio-computing', productCount: 4 }
    ],
    productCount: 35
  }
]

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id)
}

export const getSubcategories = (categoryId: string) => {
  const category = getCategoryById(categoryId)
  return category?.subcategories || []
}

export const getAllSubcategories = () => {
  return categories.flatMap(category => category.subcategories)
}

export const searchCategories = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return categories.filter(category =>
    category.name.toLowerCase().includes(lowercaseQuery) ||
    category.description.toLowerCase().includes(lowercaseQuery) ||
    category.subcategories.some(sub =>
      sub.name.toLowerCase().includes(lowercaseQuery)
    )
  )
}