import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div
      className="
            flex
            min-h-full
            flex-col
            justify-center
            py-12
            sm:px-6
            lg:px-8
            bg-gray-300
        "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/images/logo-black.png"
          alt="logo chat app"
          width="120"
          height="120"
          className="mx-auto w-auto"
        />
      </div>
      <AuthForm />
    </div>
  );
}
