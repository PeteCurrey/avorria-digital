import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			sans: [
  				'Inter',
  				'ui-sans-serif',
  				'system-ui',
  				'sans-serif',
  				'Apple Color Emoji',
  				'Segoe UI Emoji',
  				'Segoe UI Symbol',
  				'Noto Color Emoji'
  			],
  			serif: [
  				'ui-serif',
  				'Georgia',
  				'Cambria',
  				'Times New Roman',
  				'Times',
  				'serif'
  			],
  			mono: [
  				'ui-monospace',
  				'SFMono-Regular',
  				'Menlo',
  				'Monaco',
  				'Consolas',
  				'Liberation Mono',
  				'Courier New',
  				'monospace'
  			]
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		keyframes: {
			'accordion-down': {
				from: {
					height: '0'
				},
				to: {
					height: 'var(--radix-accordion-content-height)'
				}
			},
			'accordion-up': {
				from: {
					height: 'var(--radix-accordion-content-height)'
				},
				to: {
					height: '0'
				}
			},
			'fade-in': {
				'0%': {
					opacity: '0',
					transform: 'translateY(16px)'
				},
				'100%': {
					opacity: '1',
					transform: 'translateY(0)'
				}
			},
			'fade-in-up': {
				'0%': {
					opacity: '0',
					transform: 'translateY(12px)'
				},
				'100%': {
					opacity: '1',
					transform: 'translateY(0)'
				}
			},
			'fade-in-left': {
				'0%': {
					opacity: '0',
					transform: 'translateX(-24px)'
				},
				'100%': {
					opacity: '1',
					transform: 'translateX(0)'
				}
			},
			'fade-in-right': {
				'0%': {
					opacity: '0',
					transform: 'translateX(24px)'
				},
				'100%': {
					opacity: '1',
					transform: 'translateX(0)'
				}
			},
			'fade-in-scale': {
				'0%': {
					opacity: '0',
					transform: 'scale(0.92)'
				},
				'100%': {
					opacity: '1',
					transform: 'scale(1)'
				}
			},
			'scale-in': {
				'0%': {
					transform: 'scale(0.95)',
					opacity: '0'
				},
				'100%': {
					transform: 'scale(1)',
					opacity: '1'
				}
			},
			'slide-up': {
				'0%': {
					opacity: '0',
					transform: 'translateY(20px)'
				},
				'100%': {
					opacity: '1',
					transform: 'translateY(0)'
				}
			},
			'slide-in-right': {
				'0%': {
					opacity: '0',
					transform: 'translateX(-20px)'
				},
				'100%': {
					opacity: '1',
					transform: 'translateX(0)'
				}
			},
			'gradient-shift': {
				'0%, 100%': {
					backgroundPosition: '0% 50%'
				},
				'50%': {
					backgroundPosition: '100% 50%'
				}
			},
			'float': {
				'0%, 100%': {
					transform: 'translateY(0)'
				},
				'50%': {
					transform: 'translateY(-10px)'
				}
			},
			'glow-pulse': {
				'0%, 100%': {
					opacity: '0.4',
					transform: 'scale(1)'
				},
				'50%': {
					opacity: '0.8',
					transform: 'scale(1.05)'
				}
			},
			'reveal-up': {
				'0%': {
					opacity: '0',
					transform: 'translateY(40px)',
					filter: 'blur(8px)'
				},
				'100%': {
					opacity: '1',
					transform: 'translateY(0)',
					filter: 'blur(0)'
				}
			},
			'reveal-scale': {
				'0%': {
					opacity: '0',
					transform: 'scale(0.8) translateY(20px)'
				},
				'100%': {
					opacity: '1',
					transform: 'scale(1) translateY(0)'
				}
			},
			counter: {
				from: {
					'--num': '0'
				},
				to: {
					'--num': '100'
				}
			},
			shimmer: {
				'0%': {
					transform: 'translateX(-100%)'
				},
				'100%': {
					transform: 'translateX(100%)'
				}
			},
			'border-beam': {
				'0%': {
					transform: 'translateX(-100%)'
				},
				'100%': {
					transform: 'translateX(100%)'
				}
			},
			'typewriter-cursor': {
				'0%, 100%': { opacity: '1' },
				'50%': { opacity: '0' }
			},
			'glow-pulse-accent': {
				'0%, 100%': {
					textShadow: '0 0 20px hsl(var(--primary) / 0.4)'
				},
				'50%': {
					textShadow: '0 0 30px hsl(var(--primary) / 0.6)'
				}
			},
			'morph-gradient': {
				'0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
				'50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' }
			}
		},
		animation: {
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
			'fade-in': 'fade-in 340ms var(--ease-primary, cubic-bezier(0.4, 0, 0.2, 1))',
			'fade-in-up': 'fade-in-up 280ms var(--ease-primary, cubic-bezier(0.4, 0, 0.2, 1))',
			'fade-in-left': 'fade-in-left 500ms var(--ease-primary, cubic-bezier(0.4, 0, 0.2, 1))',
			'fade-in-right': 'fade-in-right 500ms var(--ease-primary, cubic-bezier(0.4, 0, 0.2, 1))',
			'fade-in-scale': 'fade-in-scale 600ms var(--ease-primary, cubic-bezier(0.4, 0, 0.2, 1))',
			'scale-in': 'scale-in 280ms var(--ease-primary, cubic-bezier(0.4, 0, 0.2, 1))',
			'slide-up': 'slide-up 340ms var(--ease-primary, cubic-bezier(0.4, 0, 0.2, 1))',
			'slide-in-right': 'slide-in-right 280ms var(--ease-primary, cubic-bezier(0.4, 0, 0.2, 1))',
			'gradient-shift': 'gradient-shift 8s ease infinite',
			'float': 'float 6s ease-in-out infinite',
			'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
			'reveal-up': 'reveal-up 700ms var(--ease-primary, cubic-bezier(0.4, 0, 0.2, 1))',
			'reveal-scale': 'reveal-scale 600ms var(--ease-primary, cubic-bezier(0.4, 0, 0.2, 1))',
			shimmer: 'shimmer 1.5s ease-in-out infinite',
			'border-beam': 'border-beam 3s linear infinite',
			'typewriter-cursor': 'typewriter-cursor 0.5s step-end infinite',
			'glow-pulse-accent': 'glow-pulse-accent 2s ease-in-out infinite',
			'morph-gradient': 'morph-gradient 8s ease-in-out infinite'
		},
  		backgroundSize: {
  			'300': '300% 300%'
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
