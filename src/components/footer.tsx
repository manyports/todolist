export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="text-center">
        <p className="text-gray-600">© {currentYear} To Do List. All rights reserved.</p>
      </footer>
    )
  }
  