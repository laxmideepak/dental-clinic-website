export default function IteroSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
              SEE YOUR SMILE IN 3D
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Our advanced technology, including the{" "}
              <a 
                href="https://www.jeffersondentalclinics.com/dental-services/itero-3d-scanning" 
                className="text-jefferson-blue hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                iTero 3D Scanner
              </a>
              , is the roadmap to our future–one we can build together. The scanner allows us to show our patients exactly what the dentist sees and design a customized Smile Roadmap to help our patients achieve their best smile ever.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Advanced 3D dental scanning technology" 
              className="rounded-xl shadow-lg w-full h-auto" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
