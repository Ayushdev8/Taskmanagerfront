function HomeCom(){
    return(
        <>
            <section className="relative flex flex-col justify-center items-center text-center px-6 py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      {/* Background blur circles */}
      <div className="absolute w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20 top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-20 bottom-10 right-10"></div>

      <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
        Organize Your Work <br className="hidden md:block"/> Like a Pro
      </h2>

      <p className="text-gray-600 max-w-2xl mb-8 text-lg">
        A simple and powerful task manager to track, manage, and complete your daily tasks efficiently.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl text-lg shadow-lg hover:bg-blue-700 transition">
          Get Started
        </button>
        <button className="border border-gray-300 px-8 py-3 rounded-2xl text-lg hover:bg-gray-100 transition">
          Learn More
        </button>
      </div>
    </section>
        </>
    )
}
export default HomeCom