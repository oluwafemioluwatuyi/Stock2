import './directory-item.scss'


const DirectoryItem = ({category}) => {

    const {title, imageUrl} = category
    return (
        <div  className='directory-item-container'>
        <div className='background-image' style={{backgroundImage: `Url(${imageUrl})`}}
        />
        <div className='body'>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </div>
      </div>
    )

}


export default DirectoryItem;