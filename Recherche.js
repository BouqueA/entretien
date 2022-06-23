const Recherche = () => {
    const { id } = useParams();
    const [searchTerm, setSearchTerm] = useState(`${id}`);
    if(searchTerm.length === 0 ){ setSearchTerm("Tous")}
    function filtre(){
        return (
            Data.filter((post)=> {
                    if(searchTerm === ""){ // si on ne recherche pas, on affiche tout
                        return post
                    } else if (post.secteur.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === "Tous"){ // si on recherche, on filtre par secteur
                        return post
                    }
                }).map(post => {
                    return(
                        <>
                            <div className="post-info">
                                <div className="row">
                                    <p className="post-titre">{post.titre} - <span className="post-entreprise">{post.entreprise}</span></p>
                                    <p className="post-description"><i className="fas fa-info"></i>{post.description}</p>
                                    <p><i className="fas fa-calendar"></i><span className="post-date">{post.date}</span><i className="fas fa-map-marker-alt"></i><span className="post-lieu">{post.lieu}</span></p>

                                </div>
                                <div className="row">
                                    <button type="button">
                                        Voir l'offre
                                    </button>
                                    <p>Avis : 4.8/5</p>
                                </div>
                            </div>
                        </>
                    )
                })
        )
    }

    return (
        <div>
            <Navigation/>
            <div className="recherche-container">
                <div className="recherche-container-form">
                    <div className="search-form">
                        <label>Domaine : </label>
                        <input type="search" autoComplete="off" required="" defaultValue={ id } onChange={(event => ( setSearchTerm(event.target.value) ))}/>
                    </div>
                    <Slider/>
                </div>
                <p className="information">{filtre().length} stages trouvés pour : <span className="bold">{ searchTerm }</span></p>
                <div className="posts">
                    {filtre()}
                </div>
            </div>
        </div>
    );
};