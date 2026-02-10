export default function FlashSale() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 w-full p-4">
      
    
      <div className="flex flex-col gap-3 max-w-md">
        <h2 className="font-bold text-2xl">Flash Sale</h2>
        <p className="text-start text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
          ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
          leo.
        </p>
      </div>

     
      <div className="flex justify-center md:justify-end">
        <div className="w-[200px] h-[200px] rounded-full border-2 border-[rgba(217,23,108,.5)] outline outline-[rgba(217,23,108,1)] flex items-center justify-center">
          <span className="text-xl font-bold">30:00:00</span>
        </div>
      </div>

    </div>
  );
}
