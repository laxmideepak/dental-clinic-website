export default function AdaSafety() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/American_Dental_Association_logo.svg/400px-American_Dental_Association_logo.svg.png" 
                alt="ADA American Dental Association logo" 
                className="w-48 h-auto mb-4" 
              />
            </div>
            <div>
              <p className="text-lg text-gray-700">
                According to studies by the ADA, COVID-19 infection rates of optometrists remain lower than other health professionals. GoTo Optical remains committed to team member and patient safety, utilizing enhanced infection control procedures in all of our offices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
