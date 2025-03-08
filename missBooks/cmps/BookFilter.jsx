

export function BookFilter(props) {

    const { filterBy, filterSetter, maxPrice } = props;
    const { title = '' } = filterBy;

    function onTitleChange(event) {
        const updatedTitle = event.target.value;
        filterSetter({ ...filterBy, title: updatedTitle });
    }

    function onPriceChange(event) {
        const updatedPrice = event.target.value;
        filterSetter({ ...filterBy, price: updatedPrice })
    }

    return (
        <section className="book-filter">
            <form>
                <label htmlFor="title">Name:</label>
                <input type="text" name="title" id="title-input" value={title} onChange={onTitleChange}></input>
                <label>Price:</label>
                <input type="range" min="0" max={maxPrice} step="0.01" onChange={onPriceChange} defaultValue={0}></input>
            </form>
        </section>
    )
}
