/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  Image,
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} = React;

var getStyleFromScore = require('./getStyleFromScore');
var getImageSource = require('./getImageSource');
var getTextFromScore = require('./getTextFromScore');

var MovieCell = React.createClass({

  onHighlight: function() {
    this.setState({highlighted: true});
  },

  onUnhighlight: function() {
    this.setState({highlighted: false});
  },

  getInitialState: function() {
    return {
      highlighted: false,
    };
  },

  render: function() {
    var criticsScore = this.props.movie.ratings.critics_score;
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    var highlightedStyle = this.state.highlighted ? styles.highlighted : styles.unhighlighted;
    var highlightedTouchableStyle = this.state.highlighted ? styles.highlightedTouchable : styles.unhighlightedTouchable;
    return (
      <View>
        <TouchableElement 
          style={highlightedTouchableStyle}
          onPress={this.props.onSelect}
          onShowUnderlay={this.onHighlight}
          onHideUnderlay={this.onUnhighlight}
          >
          <View style={[styles.row, highlightedStyle]}>
            {/* $FlowIssue #7363964 - There's a bug in Flow where you cannot
              * omit a property or set it to undefined if it's inside a shape,
              * even if it isn't required */}
            <Image
              source={getImageSource(this.props.movie, 'det')}
              style={styles.cellImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.movieTitle} numberOfLines={2}>
                {this.props.movie.title}
              </Text>
              <Text style={styles.movieYear} numberOfLines={1}>
                {this.props.movie.year}
                {' '}&bull;{' '}
                <Text style={getStyleFromScore(criticsScore)}>
                  Critics {getTextFromScore(criticsScore)}
                </Text>
              </Text>
            </View>
          </View>
        </TouchableElement>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  movieTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  movieYear: {
    color: '#999999',
    fontSize: 12,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  highlighted: {
    backgroundColor: '#A8A8A8',
  },
  unhighlighted: {
    backgroundColor: 'white',
  },
  highlightedTouchable: {
    backgroundColor: '#F8F8F8',
  },
  unhighlightedTouchable: {
    backgroundColor: 'white',
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 93,
    marginRight: 10,
    width: 60,
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    // Trick to get the thinest line the device can display
    height: 1 / PixelRatio.get(),
    marginLeft: 4,
  },
});

module.exports = MovieCell;
