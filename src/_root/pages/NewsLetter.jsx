import React from "react";
import PDFViewer from "../../components/shared/PDFViewer";
import Input from "../../components/ui/Input";
import { MessageCircle } from "lucide-react";

const NewsLetter = () => {
  return (
    <div className="h-screen flex flex-col flex-1 md:pt-32 py-24 px-5 md:p-14 overflow-y-scroll custom-scrollbar bg-gray-50">
      <div className="max-w-5xl flex flex-col items-center w-full gap-6 md:gap-9 justify-start">
        <h2 className="h3-bold md:h2-bold w-full mb-4">Newsletter</h2>
      </div>
      <div className="w-fit h-fit flex lg:flex-row flex-wrap p-4 gap-4 bg-accent-gray rounded-lg shadow-md">
        <div className="h-fit">
          <PDFViewer file="/Nano_Threads_ED01.pdf" />
        </div>
        {/* <div className="flex-between flex-col gap-2">
          <div className="flex w-full flex-col">
            <h3 className="text-lg font-semibold w-full mb-4">
              Title of the Newsletter
            </h3>
            <hr className="border border-neutral-black/70 mt-1 w-full" />
          </div>
          <Input icon={<MessageCircle />} className="w-full" />
        </div> */}
      </div>
    </div>
  );
};

export default NewsLetter;
