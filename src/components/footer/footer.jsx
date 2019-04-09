import './footer.scss'
export default {
  data () {
    return {
      author: 'jovy'
    }
  },
  render () {
    return (
      <div id="footer">
        <span>this is jsx footer</span>
        |
        <span>author: {this.author}</span>
      </div>
    )
  }
}
