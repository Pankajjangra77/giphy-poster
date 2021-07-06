import React from 'react'

function Post({text,imgUrl}) {
    return (
        <div className="post__container">
            <div className="post__text">{text}</div>
            <div className="post__image">
                <img src={imgUrl}  alt="gifhy" />
            </div>
        </div>
    )
}

export default Post
