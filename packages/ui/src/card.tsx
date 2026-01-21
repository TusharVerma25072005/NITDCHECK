interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Card({ icon, title, description }: CardProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition h-full">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4">
        {icon}
      </div >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}