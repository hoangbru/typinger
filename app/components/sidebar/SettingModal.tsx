"use client";

import { User } from "@prisma/client";
import Modal from "../Modal";
import Input from "../inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import {
  HiOutlinePencilSquare,
  HiArrowUpTray,
  HiOutlineViewfinderCircle,
} from "react-icons/hi2";
import Button from "../Button";
import axios from "axios";
import {toast} from 'react-hot-toast'

interface SettingModalProps {
  currentUser: User;
  isOpen?: boolean;
  onClose: () => void;
}

const SettingModal: React.FC<SettingModalProps> = ({
  currentUser = {},
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch('image');

  const handleUpload = (result:any) => {
    setValue('image', result.info.secure_url, {
        shouldValidate: true
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/settings', data)
    .then(() => {
        router.refresh()
        onClose()
    })
    .catch(() => toast.error('Something went wrong!'))
    .finally(() => setIsLoading(false))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2
              className="
                  text-base 
                  font-semibold 
                  leading-7 
                  text-gray-900
                "
            >
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your public information.
            </p>

            <div className="mt-4 flex justify-center items-center">
              <CldUploadButton
                options={{ maxFiles: 1 }}
                uploadPreset="typinger"
                onUpload={handleUpload}
              >
                <div className="relative">
                  <Button disabled={isLoading} secondary type="button">
                    <Image
                      width="78"
                      height="78"
                      className="rounded-full object-cover"
                      src={image || currentUser?.image || "/images/placeholder.jpg"}
                      alt="Avatar"
                    />
                    <HiOutlineViewfinderCircle
                      size={26}
                      className="absolute bottom-0 right-2 bg-gray-200 rounded-full p-1"
                    />
                  </Button>
                </div>
              </CldUploadButton>
            </div>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
            </div>
          </div>
        </div>

        <div
          className="
            mt-6 
            flex 
            items-center 
            justify-end 
            gap-x-6
          "
        >
          <Button disabled={isLoading} secondary onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SettingModal;
