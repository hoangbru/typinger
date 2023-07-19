"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  HiEllipsisHorizontal,
  HiOutlineVideoCamera,
  HiOutlineArrowSmallLeft,
  HiOutlinePhone,
} from "react-icons/hi2";
import Avatar from "@/app/components/Avatar";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
  conversation: Conversation & { users: User[] };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {members}  = useActiveList()
  const isActive = members.indexOf(otherUser?.email!) !== -1
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return isActive ? "Online" : "Offline";
  }, [conversation, isActive]);
  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div
        className="
        bg-white 
        w-full 
        flex 
        border-b-[1px] 
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm 
    "
      >
        <div className="flex gap-3 items-center">
          <Link
            className="
                    lg:hidden 
                    block 
                    text-black 
                    hover:text-gray-600 
                    transition 
                    cursor-pointer"
            href="/conversations"
          >
            <HiOutlineArrowSmallLeft size={28} />
          </Link>
          {conversation.isGroup ? <AvatarGroup users={conversation.users}/> : <Avatar user={otherUser} />}
          <div className="flex flex-col ">
            <div className="font-poppins font-semibold">
              {conversation.name || otherUser.name}
            </div>
            <div className="font-poppins text-sm font-semi-bold text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <HiOutlinePhone
            className="
            text-black
            cursor-pointer
            hover:text-gray-600
            transition
             "
            size={20}
          />
          <HiOutlineVideoCamera
            className="
            text-black
            cursor-pointer
            hover:text-gray-600
            transition
             "
            size={22}
          />
          <HiEllipsisHorizontal
            size={30}
            onClick={() => setDrawerOpen(true)}
            className="
          text-black
          cursor-pointer
          hover:text-gray-600
          transition
        "
          />
        </div>
      </div>
    </>
  );
};

export default Header;
