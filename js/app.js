var my_news = [
	{
		author: 'Саша Печкин',
		text: 'В четчерг, четвертого числа...',
		bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
	},
	{
		author: 'Просто Вася',
		text: 'Считаю, что $ должен стоить 35 рублей!',
		bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
	},
	{
		author: 'Гость',
		text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
		bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
	}
];

var Article = React.createClass({
  propTypes: {
	data: React.PropTypes.shape({
	  author: React.PropTypes.string.isRequired,
	  text: React.PropTypes.string.isRequired,
	  bigText: React.PropTypes.string.isRequired
	})
  },

  getInitialState: function() {
	return {
	  visible: false
	};
  },

  readmoreClick: function(e) {
 		e.preventDefault();
			this.setState({visible: true});
	},


  render: function() {
	var author = this.props.data.author,
		text = this.props.data.text,
		bigText = this.props.data.bigText,
		visible = this.state.visible; // считываем значение переменной из состояния компонента

	return (
	  <div className='article'>
		<p className='news__author'>{author}:</p>
		<p className='news__text'>{text}</p>

		{/* для ссылки readmore: не показывай ссылку, если visible === true */}
		<a href="#" onClick={this.readmoreClick} className={'news__readmore ' + (visible ? 'none': '')}>Подробнее</a>
		<p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>
	  </div>
	)
  }
});


var News = React.createClass({
	propTypes: {
		data: React.PropTypes.array.isRequired
	},

	getInitialState: function() {
		return {
			counter: 0
		}
	},

	render: function() {
		var data = this.props.data;
		var newsTemplate;
			if (data.length > 0) {
				newsTemplate = data.map(function(item, index) {
					return (
						<div key={index}>
							<Article data={item} />
						</div>
					)
			})
			} else {
				newsTemplate = <p>К сожалению новостей нет</p>
			}
			return (
				<div className='news'>
					{newsTemplate}
						<strong className={'news__count ' + (data.length > 0 ? '':'none') } onClick={this.onTotalNewsClick}>
							Всего новостей: {data.length}
						</strong>
				</div>
			);
	}
});

var Add = React.createClass({
	componentDidMount: function() {
		ReactDOM.findDOMNode(this.refs.author).focus();
	},

	onBtnClickHandler: function(e) {
		e.preventDefault();
	},

	render: function() {
		return (
			<form className='add cf'>
				<input
					type='text'
					className='add__author'
					defaultValue=''
					placeholder='Ваше имя'
					ref='author'
				/>
				<textarea className={'add__text '+'add__none'} defaultValue='' placeholder='Текст новости' ref='text'></textarea>
				<label className='add__checkrule'>
				<input type='checkbox' defaultChecked={false} ref='checkrule' />Я согласен с правилами</label>
				<button className='add__btn' onClick={this.onBtnClickHandler} ref='alert_button'>Показать alert</button>
			</form>
		);
	}
});

var App = React.createClass ({
	render: function() {
		return (
			<div className='app'>
				<h3>Новости</h3>
				<Add></Add>
				<News data={my_news} />
			</div>
		);
	}
});

ReactDOM.render(
<App />,
document.getElementById('root')
);
