export const COLORS = {
	primary: {
		light: '#3B82F6',
		dark: '#A855F7'
	},
	background: {
		light: '#FFFFFF',
		dark: '#121212'
	},
	surface: {
		light: '#F8F9FA',
		dark: '#1E1E1E'
	},
	surfaceElevated: {
		light: '#FFFFFF',
		dark: '#2C2C2C'
	},
	text: {
		primary: {
			light: '#1A1A1A',
			dark: '#FFFFFF'
		},
		secondary: {
			light: '#666666',
			dark: '#FFFFFF'
		},
		disabled: {
			light: '#999999',
			dark: '#FFFFFF'
		},
		onPrimary: {
			light: '#FFFFFF',
			dark: '#121212'
		}
	},
	border: {
		light: '#E0E0E0',
		dark: '#333333'
	},
	divider: {
		light: '#EEEEEE',
		dark: '#2A2A2A'
	},
	search: {
		background: {
			light: '#F1F3F4',
			dark: '#2C2C2C'
		},
		icon: {
			light: '#757575',
			dark: '#B0B0B0'
		}
	},
	success: {
		light: '#4CAF50',
		dark: '#66BB6A'
	},
	error: {
		light: '#EF5350',
		dark: '#E57373'
	},
	info: {
		light: '#42A5F5',
		dark: '#64B5F6'
	},
	nav: {
		background: {
			light: '#FFFFFF',
			dark: '#1E1E1E'
		},
		inactive: {
			light: '#9E9E9E',
			dark: '#757575'
		}
	},
	disabled: {
		background: {
			light: '#CCCCCC',
			dark: '#3A3A3A'
		}
	},
	overlay: {
		light: 'rgba(0, 0, 0, 0.5)',
		dark: 'rgba(0, 0, 0, 0.7)'
	},
	orderStatus: {
		pending: {
			background: {
				light: '#FEF3C7',
				dark: '#78350F'
			},
			text: {
				light: '#92400E',
				dark: '#FDE68A'
			},
			border: {
				light: '#FCD34D',
				dark: '#B45309'
			}
		},
		confirmed: {
			background: {
				light: '#DBEAFE',
				dark: '#1E3A8A'
			},
			text: {
				light: '#1E40AF',
				dark: '#93C5FD'
			},
			border: {
				light: '#93C5FD',
				dark: '#3B82F6'
			}
		},
		preparing: {
			background: {
				light: '#FEE2E2',
				dark: '#7F1D1D'
			},
			text: {
				light: '#991B1B',
				dark: '#FECACA'
			},
			border: {
				light: '#FCA5A5',
				dark: '#DC2626'
			}
		},
		onTheWay: {
			background: {
				light: '#E0E7FF',
				dark: '#312E81'
			},
			text: {
				light: '#3730A3',
				dark: '#A5B4FC'
			},
			border: {
				light: '#818CF8',
				dark: '#4F46E5'
			}
		},
		delivered: {
			background: {
				light: '#D1FAE5',
				dark: '#064E3B'
			},
			text: {
				light: '#065F46',
				dark: '#6EE7B7'
			},
			border: {
				light: '#6EE7B7',
				dark: '#10B981'
			}
		},
		cancelled: {
			background: {
				light: '#F3F4F6',
				dark: '#1F2937'
			},
			text: {
				light: '#374151',
				dark: '#9CA3AF'
			},
			border: {
				light: '#D1D5DB',
				dark: '#4B5563'
			}
		}
	}
} as const
