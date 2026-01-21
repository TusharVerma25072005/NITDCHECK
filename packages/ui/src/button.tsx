"use client"
export default function Button({
  onClick,
  children,
  light
}: {
  onClick: () => void;
  children: React.ReactNode;
  light?: boolean;
}){
  return (
    <button
      onClick={onClick}
      className={
        light
          ? "bg-white border border-gray-300 text-black font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition hover:cursor-default"
          : "bg-[#050013] text-white font-semibold px-4 py-2 rounded-lg transition hover:bg-[#050013]/80 hover:cursor-default"
      }
    >
      {children}
    </button>
  );
};
