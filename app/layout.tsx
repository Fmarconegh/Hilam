import './globals.css';

export const metadata = {
  title: 'HilamIA',
  description: 'Agente inteligente en construcción en madera laminada y CLT',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
