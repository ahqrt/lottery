module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007AFF',
        background: '#F0F2F5',
        text: '#1C1C1E',
        glass: 'rgba(255, 255, 255, 0.4)'
      },
      boxShadow: {
        neumorphism: '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.5)',
        'neumorphism-inset': 'inset 8px 8px 16px rgba(0, 0, 0, 0.1), inset -8px -8px 16px rgba(255, 255, 255, 0.5)'
      },
      backdropBlur: {
        sm: '4px',
        md: '8px',
        lg: '12px'
      }
    }
  },
  plugins: []
}
