"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitErrorHandler, useForm } from "react-hook-form";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { HiOutlinePaperClip, HiPaperAirplane } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result:any) => {
    axios.post('/api/messages', {
      image: result?.info?.secure_url,
      conversationId
    })
  }

  return (
    <div
      className="
        py-4 
        px-4
        bg-white 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
        "
    >
      <CldUploadButton 
        options={{maxFiles: 1}}
        onUpload={handleUpload}
        uploadPreset="typinger"
      >
        <HiOutlinePaperClip
          className="
        cursor-pointer
        text-black"
          size={20}
        />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Insert a message..."
        />
        <button
          type="submit"
          className="
            cursor-pointer 
          "
        >
          <HiOutlinePaperAirplane
            size={20}
            className="text-black hover:text-gray-600 "
          />
        </button>
      </form>
    </div>
  );
};

export default Form;
