import React, { Component } from "react";
import { connect } from "react-redux";

import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

import {
  postList,
  addPost,
  editPost,
  deletePost
} from "../reducers/postsActions";

class Post extends Component {
  state = {
    loading: true,
    isOpenModal: false
  };
  componentDidMount() {
    this.props.postList();
    // console.log("xxx");
  }

  componentDidUpdate() {
    console.log("xxx");
  }

  submit = data => {
    const date = new Date();
    let post_date =
      date.getDate() +
      "." +
      (date.getMonth() + 1) +
      "." +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();

    data.post_date = post_date;
    this.props.addPost(data);

    this.setState({ isOpenModal: false });

    // this.props.postList();
    // setTimeout(this.props.postList(), 3000);
  };

  deleta = post => {
    this.props.deletePost(post);
  };

  edit = post => {
    this.props.editPost(post);
  };

  openModal = () => {
    this.setState({ isOpenModal: true });
  };

  closeModal = () => {
    this.setState({ isOpenModal: false });
  };

  render() {
    return (
      <div className="post">
        <button className="btn btn-primary ml-4" onClick={this.openModal}>
          Dodaj post
        </button>

        {this.state.isOpenModal ? (
          <PostForm
            onSubmit={this.submit}
            isOpenModal={this.state.isOpenModal}
            onCloseModal={this.closeModal.bind(this)}
            initialValues={{}}
          />
        ) : null}

        <PostList
          postList={this.props.post}
          delatePost={this.props.deletePost}
          edit={this.edit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);

  return {
    post: state.postReducer.postList
  };
};

const mapDispatchToProps = {
  postList,
  addPost,
  editPost,
  deletePost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
