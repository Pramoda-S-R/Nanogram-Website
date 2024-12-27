const Unique = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="mx-auto max-w-2xl px-6 lg:px-8 grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-7xl lg:grid-cols-2">
        <div>
          <div className="text-base leading-7 lg:mx-w-lg">
            <div className="text-base font-semibold leading-7 text-primary/70">
              Formation of Nanogram
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Who We Are
            </h1>
            <div className="max-w-xl">
              <p className=" mt-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
                possimus cupiditate dolores nam fuga et?
              </p>
              <p className="mt-6">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Perspiciatis cumque accusantium omnis amet reprehenderit aut!
              </p>
              <p className="mt-6">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Repellendus, veniam! Nobis consequuntur consequatur dolorem
                harum?
              </p>
            </div>
          </div>
        </div>
        <div className="lg:pl-4 flex justify-end items-start">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl lg:max-w-lg">
            <img
              src="/assets/images/placeholder.png"
              alt="img"
              className=" h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unique;
