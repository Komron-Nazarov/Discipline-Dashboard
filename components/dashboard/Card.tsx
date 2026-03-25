type Card = {
    title: string;
    value: string;
};

export default function Card({title, value}: CardProps) {
    return(
        <div className="bg-[#1a1a1a] rounded-2xl p-4 shadow-lg hover:scale-105 transition">
          
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition"></div>
          
          <div className="relative z-10">
            <h2 className="text-gray-400 text-sm tracking-wide">
                {title}
            </h2>
       
          
            <p className="text-3xl font-bold mt-2 group-hover:text-purple-400 transition">
                {value}
            </p>
          </div>

        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-purple-500 group-hover:w-full transition-all duration-300"></div>
    
    
    </div>



    );
};