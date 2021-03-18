import React from 'react';
import { safeCredentials, handleErrors } from './utils/fetchHelper';

const Tweet = (props) => {
  return (
    <div className="tweet col-12">
      <a className="tweet-username" data-user={props.user} onClick={props.seeUser}>{props.user}</a>
      <a className="tweet-screenName ml-2" data-user={props.user} onClick={props.seeUser}>@{props.user}</a>
      <p>{props.message}</p>
      <a className="delete-tweet" data-user={props.user} data-tweet={props.id} onClick={props.delete}>Delete</a>
    </div>
  );
}

class NewTweet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      char: 140,
      composition: '',
      image_url: false,
      textarea_size: 'form-control post-input'
    }
    this.handleComposition = this.handleComposition.bind(this);
    this.charCount =  this.charCount.bind(this);
    this.postTweet = this.postTweet.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  handleComposition () {
    event.preventDefault();
    let { value } = event.target;
    let update = () => {
      return new Promise ((resolve, reject) => {
        resolve(this.setState({ composition: value }));
      });
    }
    update().then(this.charCount);
  }

  charCount () {
    let {composition} = this.state;
    this.setState({ char: 140 - composition.length })
  }

  postTweet() {
    let {composition} = this.state;
    fetch(`/api/tweets`, safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        tweet: {
          message: composition,
        }
      })
    }))
    .then(handleErrors)
    .then(res => {
      this.setState({composition: ''})
      this.props.refresh();
    }).catch((error) => {
      console.log(error);
    })
  }

  handleImage() {
    this.setState({image_url: URL.createObjectURL(event.target.files[0])})
    this.setState({textarea_size: 'form-control post-input textarea-small'})
  }


  render(){
    let {char, composition, image_url, textarea_size} = this.state;
    return (
      <React.Fragment>
        <div className="col-12 post-tweet-box">
          <textarea type="textarea" className={textarea_size} rows="3" placeholder="What's happening?" onChange={this.handleComposition} value={composition}></textarea>
          {image_url &&
          <div className="preview-wrapper">
            <img id="image-preview" src={image_url} alt="image preview"/>
          </div>}
          <div className="float-right">
            <label id="upload-image-btn"><strong>Upload image</strong>
              <input type="file" id="image-select" name="image" accept="image/*" onChange={this.handleImage}/>
            </label>
            <span className="post-char-counter">{char}</span>
            <button className="btn btn-primary" id="post-tweet-btn" onClick={this.postTweet}>Tweet</button>
          </div>

        </div>
      </React.Fragment>
    );

  }
}

const Profile = (props) => {
  return (
      <div className="col-3 profile">
        <div className="profileCard col-12">
          <div className="profileCard-content">
            <div className="user-field col-12">
              <a className="username" data-user={props.user} onClick={props.seeUser}>{props.user}</a><br/>
              <a className="screenName" data-user={props.user}  onClick={props.seeUser}>@{props.user}</a>
            </div>
            <div className="user-stats">
              <div className="col-3">
                <a href="">
                  <span>Tweets<br/></span>
                  <span className="user-stats-tweets">{props.usercount}</span>
                </a>
              </div>
              <div className="col-4">
                <a href="">
                  <span>Following<br/></span>
                  <span className="user-stats-following">0</span>
                </a>
              </div>
              <div className="col-4">
                <a href="">
                  <span>Followers<br/></span>
                  <span className="user-stats-followers">0</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
  );
}

const UserBanner = (props) => {
  return(
    <React.Fragment>
      <div className="user-banner">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <a className="" onClick={props.return}>&lt; Back to Feed...</a>
            </div>
            <div className="col-9 offset-1">
              <h3>{props.user}</h3>
              <h5>@{props.user}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="userpage-space col-12">
      </div>
    </React.Fragment>
  )
}

class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userpage: false,
      feed: {},
      usercount: 0,
      viewing: undefined,
    }
    this.showAllTweets = this.showAllTweets.bind(this);
    this.deleteTweet = this.deleteTweet.bind(this);
    this.showUserTweets = this.showUserTweets.bind(this);
    this.seeUserPage = this.seeUserPage.bind(this);
    this.returnToFeed = this.returnToFeed.bind(this);
  }

  componentDidMount() {
    let {userpage} = this.state;
    if (!userpage) {
      this.showAllTweets();
    }
  }

  componentWillUnmount() {}

  showAllTweets() {
    fetch(`/api/tweets`, safeCredentials({
      method: 'GET',
    }))
    .then(handleErrors)
    .then(res => {
      this.setState({feed: res.tweets});
      this.showUserTweets();
    }).catch((error) => {
      console.log(error);
    })
  }

  showUserTweets (user = this.props.user) {
    fetch(`/api/users/`+user+`/tweets`, safeCredentials({
      method: 'GET',
    }))
    .then(handleErrors)
    .then(res => {
      if (user === this.props.user) {
        this.setState({usercount: res.tweets.length});
      }
      if (this.state.userpage) {
        this.setState({feed: res.tweets})
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  deleteTweet () {
    event.preventDefault();

    let id = event.target.getAttribute("data-tweet");
    let user = event.target.getAttribute("data-user");

    if (user === this.props.user) {
      fetch(`/api/tweets/`+id, safeCredentials({
        method: 'DELETE',
      }))
      .then(handleErrors)
      .then(res => {
        if (res.success) {
          this.showAllTweets();
        }
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  seeUserPage () {
    let user = event.target.getAttribute("data-user");
    this.setState({viewing: user})
    this.setState({userpage: true});
    this.showUserTweets(user);
  }

  returnToFeed() {
    this.setState({userpage: false});
    this.showAllTweets();
  }

  render() {
    let {feed, usercount, userpage, viewing} = this.state;
    let {user} = this.props;
    let tweets = <div></div>
    if (feed.length !== undefined) {
      tweets = feed.map(tweet => <Tweet key={tweet.id} id={tweet.id} seeUser={this.seeUserPage} user={tweet.username} message={tweet.message} delete={this.deleteTweet}/>)
    }
    return (
      <React.Fragment>
        {userpage && <UserBanner user={viewing} return={this.returnToFeed}/>}
        <Profile user={user} usercount={usercount} seeUser={this.seeUserPage}/>
        <div className="col-6 feed-box">

          {!userpage && <NewTweet refresh={this.showAllTweets}/>}
          <div className="feed">
            {tweets}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Feed;
