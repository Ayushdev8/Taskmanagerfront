import { Link } from "react-router-dom"

function FooterCom(){
    return(
        <>
            <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-3">TaskManager</h2>
          <p className="text-sm">Manage your tasks smartly and boost your productivity with ease.</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-white">Home</Link></li>
            <li><Link href="#" className="hover:text-white">Dashboard</Link></li>
            <li><Link href="#" className="hover:text-white">Tasks</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p className="text-sm">Email: support@taskmanager.com</p>
        </div>
      </div>

      <div className="text-center text-sm border-t border-gray-700 py-4">
        © 2026 TaskManager. All rights reserved.
      </div>
    </footer>

        </>
    )
}
export default FooterCom