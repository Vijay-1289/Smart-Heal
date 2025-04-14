import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            Heal Smart
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/services" className="text-dark hover:text-primary transition">
              Services
            </Link>
            <Link href="/consultation" className="text-dark hover:text-primary transition">
              Consultation
            </Link>
            <Link href="/doctors" className="text-dark hover:text-primary transition">
              Doctors
            </Link>
            <Link href="/about" className="text-dark hover:text-primary transition">
              About
            </Link>
            <Link href="/contact" className="text-dark hover:text-primary transition">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-dark hover:text-primary transition">
              Login
            </Link>
            <Link href="/register" className="bg-primary text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 