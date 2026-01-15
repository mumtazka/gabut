import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
        darkMode: ["class"],
        content: [
                "./src/**/*.{js,jsx,ts,tsx}",
                "./public/index.html"
        ],
        theme: {
                extend: {
                        fontFamily: {
                                sans: ['Inter', 'system-ui', 'sans-serif'],
                                display: ['Space Grotesk', 'Inter', 'sans-serif'],
                        },
                        borderRadius: {
                                lg: 'var(--radius)',
                                md: 'calc(var(--radius) - 2px)',
                                sm: 'calc(var(--radius) - 4px)',
                                xl: 'calc(var(--radius) + 4px)',
                                '2xl': 'calc(var(--radius) + 8px)',
                                '3xl': 'calc(var(--radius) + 12px)',
                        },
                        colors: {
                                background: 'hsl(var(--background))',
                                foreground: 'hsl(var(--foreground))',
                                card: {
                                        DEFAULT: 'hsl(var(--card))',
                                        foreground: 'hsl(var(--card-foreground))'
                                },
                                popover: {
                                        DEFAULT: 'hsl(var(--popover))',
                                        foreground: 'hsl(var(--popover-foreground))'
                                },
                                primary: {
                                        DEFAULT: 'hsl(var(--primary))',
                                        foreground: 'hsl(var(--primary-foreground))'
                                },
                                secondary: {
                                        DEFAULT: 'hsl(var(--secondary))',
                                        foreground: 'hsl(var(--secondary-foreground))'
                                },
                                muted: {
                                        DEFAULT: 'hsl(var(--muted))',
                                        foreground: 'hsl(var(--muted-foreground))'
                                },
                                accent: {
                                        DEFAULT: 'hsl(var(--accent))',
                                        foreground: 'hsl(var(--accent-foreground))'
                                },
                                destructive: {
                                        DEFAULT: 'hsl(var(--destructive))',
                                        foreground: 'hsl(var(--destructive-foreground))'
                                },
                                border: 'hsl(var(--border))',
                                input: 'hsl(var(--input))',
                                ring: 'hsl(var(--ring))',
                        },
                        backgroundImage: {
                                'gradient-primary': 'var(--gradient-primary)',
                                'gradient-subtle': 'var(--gradient-subtle)',
                                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                                'gradient-spotlight': 'var(--gradient-spotlight)',
                                'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                        },
                        boxShadow: {
                                'glass': 'var(--shadow-glass)',
                                'glow': 'var(--shadow-glow)',
                                'elevated': 'var(--shadow-elevated)',
                        },
                        transitionTimingFunction: {
                                'smooth': 'var(--transition-smooth)',
                                'bounce': 'var(--transition-bounce)',
                                'spring': 'var(--transition-spring)',
                        },
                        keyframes: {
                                'accordion-down': {
                                        from: { height: '0' },
                                        to: { height: 'var(--radix-accordion-content-height)' }
                                },
                                'accordion-up': {
                                        from: { height: 'var(--radix-accordion-content-height)' },
                                        to: { height: '0' }
                                },
                                'float': {
                                        '0%, 100%': { transform: 'translateY(0px)' },
                                        '50%': { transform: 'translateY(-20px)' }
                                },
                                'pulse-glow': {
                                        '0%, 100%': {
                                                boxShadow: '0 0 20px hsl(220 76% 58% / 0.2), 0 0 40px hsl(220 76% 58% / 0.1)'
                                        },
                                        '50%': {
                                                boxShadow: '0 0 40px hsl(220 76% 58% / 0.4), 0 0 60px hsl(220 76% 58% / 0.2)'
                                        }
                                },
                                'shimmer': {
                                        '0%': { backgroundPosition: '-200% center' },
                                        '100%': { backgroundPosition: '200% center' }
                                },
                                'text-reveal': {
                                        '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
                                        '100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
                                },
                                'scale-in': {
                                        '0%': { opacity: '0', transform: 'scale(0.9)' },
                                        '100%': { opacity: '1', transform: 'scale(1)' }
                                },
                                'slide-up': {
                                        '0%': { opacity: '0', transform: 'translateY(30px)' },
                                        '100%': { opacity: '1', transform: 'translateY(0)' }
                                },
                                'slide-down': {
                                        '0%': { opacity: '0', transform: 'translateY(-30px)' },
                                        '100%': { opacity: '1', transform: 'translateY(0)' }
                                },
                                'fade-in': {
                                        '0%': { opacity: '0' },
                                        '100%': { opacity: '1' }
                                },
                        },
                        animation: {
                                'accordion-down': 'accordion-down 0.2s ease-out',
                                'accordion-up': 'accordion-up 0.2s ease-out',
                                'float': 'float 6s ease-in-out infinite',
                                'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
                                'shimmer': 'shimmer 3s linear infinite',
                                'text-reveal': 'text-reveal 0.8s ease-out forwards',
                                'scale-in': 'scale-in 0.5s ease-out',
                                'slide-up': 'slide-up 0.6s ease-out',
                                'slide-down': 'slide-down 0.6s ease-out',
                                'fade-in': 'fade-in 0.8s ease-out',
                        }
                }
        },
        plugins: [tailwindcssAnimate],
};