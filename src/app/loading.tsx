export default function Loading() {
  return (
    <main>
      {/* Navbar skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#880E4F]/90 backdrop-blur-sm flex items-center justify-between px-6">
        <div className="skeleton w-32 h-6 bg-white/10 rounded" />
        <div className="hidden md:flex gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton w-16 h-3 bg-white/10 rounded" />
          ))}
        </div>
      </div>

      {/* Hero skeleton */}
      <section className="min-h-screen bg-[#880E4F] flex flex-col justify-end pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto w-full pl-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-px bg-[#F48FB1]/30" />
            <div className="skeleton w-40 h-3 bg-[#F48FB1]/15 rounded" />
          </div>
          <div className="space-y-4 mb-8">
            <div className="skeleton w-[70%] h-14 bg-white/8 rounded" />
            <div className="skeleton w-[55%] h-14 bg-white/8 rounded" />
            <div className="skeleton w-[45%] h-14 bg-white/8 rounded" />
          </div>
          <div className="skeleton w-[340px] max-w-full h-4 bg-white/6 rounded mb-3" />
          <div className="skeleton w-[280px] max-w-full h-4 bg-white/6 rounded mb-12" />
          <div className="flex flex-wrap gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="skeleton w-44 h-12 bg-white/8 rounded" />
            ))}
          </div>
        </div>
      </section>

      {/* Ticker skeleton */}
      <div className="bg-[#D81B60] py-3">
        <div className="flex items-center justify-center">
          <div className="skeleton w-[600px] max-w-full h-3 bg-white/15 rounded" />
        </div>
      </div>

      {/* Columns skeleton */}
      <section className="bg-[#F5F5F5] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12 pb-6 border-b border-[#424242]/10">
            <div>
              <div className="skeleton w-20 h-3 bg-[#D81B60]/15 rounded mb-3" />
              <div className="skeleton w-36 h-9 bg-[#424242]/10 rounded" />
            </div>
            <div className="hidden md:block skeleton w-36 h-3 bg-[#424242]/8 rounded" />
          </div>
          <div className="grid gap-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-8">
                <div className="skeleton w-full md:w-64 lg:w-72 aspect-[4/3] bg-[#424242]/8 rounded shrink-0" />
                <div className="flex-1 py-2 space-y-4">
                  <div className="skeleton w-20 h-3 bg-[#D81B60]/15 rounded" />
                  <div className="skeleton w-[80%] h-7 bg-[#424242]/10 rounded" />
                  <div className="space-y-2">
                    <div className="skeleton w-full h-3.5 bg-[#424242]/6 rounded" />
                    <div className="skeleton w-[90%] h-3.5 bg-[#424242]/6 rounded" />
                    <div className="skeleton w-[60%] h-3.5 bg-[#424242]/6 rounded" />
                  </div>
                  <div className="flex gap-3">
                    <div className="skeleton w-28 h-3 bg-[#424242]/8 rounded" />
                    <div className="skeleton w-20 h-3 bg-[#424242]/6 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram skeleton */}
      <section className="bg-[#FCE4EC] py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="skeleton w-14 h-3 bg-[#D81B60]/15 rounded mb-3" />
            <div className="skeleton w-64 h-9 bg-[#880E4F]/10 rounded" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton aspect-square bg-[#880E4F]/8 rounded-3xl" />
            ))}
          </div>
        </div>
      </section>

      {/* Studies skeleton */}
      <section className="bg-[#FAF9F6] py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="skeleton w-24 h-5 bg-[#FCE4EC] rounded-full mb-6" />
            <div className="skeleton w-80 h-12 bg-[#880E4F]/8 rounded mb-6" />
            <div className="skeleton w-[500px] max-w-full h-4 bg-[#424242]/6 rounded" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="skeleton h-[380px] bg-[#424242]/8 rounded-md" />
            ))}
          </div>
        </div>
      </section>

      {/* Voceros skeleton */}
      <section className="bg-[#424242] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="skeleton w-16 h-3 bg-[#F48FB1]/15 rounded mb-3" />
            <div className="skeleton w-52 h-9 bg-white/8 rounded" />
          </div>
          <div className="flex gap-5 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="shrink-0 w-[260px] md:w-[290px]">
                <div className="skeleton w-full aspect-square bg-white/5 rounded mb-5" />
                <div className="skeleton w-32 h-5 bg-white/8 rounded mb-2" />
                <div className="skeleton w-44 h-3 bg-[#F48FB1]/15 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
