interface Props {
  title: string;
  amount: string;
  date: string;
}
export const Card = ({ title, amount, date }: Props) => {
  return (
    <div className="shadow-fuchsia-400 rounded-xl shadow-md mt-2 border-1 border-gray-400 p-2">
      <p className="text-gray-600">{title}</p>
      <div className="flex justify-center">
        <span className="text-2xl font-bold text-gray-500">{amount}</span>
      </div>
      <p className="italic text-gray-500 text-end">{date}</p>
    </div>
  )
}
