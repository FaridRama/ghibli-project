    import CardComp from "./CardComp";

    export default function CardList({ data, type, children }) {
        return (
            <div className="w-full max-w-6xl block mx-auto">
                {children}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                    {data.map((item, index) => (
                        <CardComp item={item} type={type} key={index} />
                    ))}
                </div>
            </div>
        );
    }
