function Tempo(props)
{
    const dynamicDate = new Date();
    const dynamicDateString = dynamicDate.toGMTString(-3);

    return (
        <div>
            <div>{dynamicDateString} (dinâmico)</div>
            <div>{props.staticDateString} (estático)</div>
        </div>
    )

}

export function getStaticProps()
{
    const staticDate = new Date();
    const staticDateString = staticDate.toGMTString();

    return {props: {staticDateString}, revalidate:10}
}

export default Tempo;