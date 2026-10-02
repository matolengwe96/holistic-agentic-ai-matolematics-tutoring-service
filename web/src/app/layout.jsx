import './globals.css';

export const metadata = {
  title: 'Matolematics Tutoring Services',
  description: 'Holistic Agentic AI Socratic Tutoring Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}