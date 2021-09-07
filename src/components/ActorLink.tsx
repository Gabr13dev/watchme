interface ActorProps{
    name: string;
}

export function ActorLink(prop: ActorProps){
    return (
        <p><a href={"https://google.com/search?q="+prop.name}>{prop.name}</a></p>
    )
}