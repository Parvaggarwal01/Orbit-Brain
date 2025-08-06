import { useRef } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./button";
import { Input } from "./input";

interface CreateContentModelProps {
    open: boolean;
    onClose: () => void;
}

export const CreateContentModal = ({ open, onClose }: CreateContentModelProps) => {
  const titleRef = useRef<HTMLInputElement>(null)
  return (
    <div>
      {open && (
        <div className="bg-slate-500/80 h-screen w-full fixed top-0 right-0 lg:left-0 flex justify-center items-center">

                <div className="flex flex-col p-4 cursor-pointer h-auto w-96 bg-white rounded-2xl lg:mr-36">
                    {/* //input div */}
                    <div className="flex flex-col justify-center items-center gap-8 relative ">
                        <div onClick={onClose} className="flex justify-end absolute top-0 right-0">
                            <CrossIcon size="lg" />
                        </div>
                        <div className="flex flex-col mt-10 gap-5">
                            <Input type="text" placeholder="Title*" reference={titleRef} />
                            <Input type="link" placeholder="Link*" reference={titleRef} />
                        </div>
                        <div
                            // onClick={addContent}
                            className="flex justify-center rounded-2xl items-center w-full">
                            <Button variants="primary" text="Submit" size="md"/>
                        </div>
                    </div>
                </div>
            </div>
      )}
    </div>
  );
};
