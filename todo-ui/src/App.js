import React from "react";
import axios from "axios";
import Cookies from 'js-cookie';

import {
	Form,
	FormControl,
	InputGroup,
	ListGroup,
	Modal,
	Navbar,
	Alert,
	Button,
	OverlayTrigger,
	Tooltip
} from "react-bootstrap";
import publicIp from "public-ip";
import moment from "moment/min/moment-with-locales";

moment.locale('ru')

class ButtonDelete extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDeleting: false,
			show: false,
			delItemTitle: ''
		};
		this.setShow = this.setShow.bind(this);
		this.setDeleting = this.setDeleting.bind(this);
		this.setDeleteItemTitle = this.setDeleteItemTitle.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.deleteTodoFromTodoList = this.deleteTodoFromTodoList.bind(this);
	}
	
	setShow(value) {
		this.setState({show: value})
	}
	
	setDeleting(value) {
		this.setState({isDeleting: value})
	}
	
	setDeleteItemTitle(value) {
		this.setState({delItemTitle: value})
	}
	
	handleShow(e) {
		this.setDeleteItemTitle(e.target.parentNode.parentNode.firstChild.textContent);
		this.setShow(true);
	};
	
	handleClose() {
		this.setDeleteItemTitle('');
		this.setShow(false)
	}
	
	handleCancel() {
		this.handleClose();
	};
	
	handleDeleteClick(e) {
		this.setDeleteItemTitle('');
		this.setDeleting(true);
		this.deleteTodoFromTodoList(
			e.target.value
		);
		this.handleClose();
	};
	
	deleteTodoFromTodoList(id) {
		axios
			.delete(`http://127.0.0.1:8000/api/todos/${id}/`)
			.finally(() => {
				this.setDeleting(false);
				this.props.handleGetTodosList();
			});
	};
	
	render() {
		return (
			<>
				<Button
					variant="danger"
					onClick={!this.state.isDeleting ? this.handleShow : null}
					disabled={this.state.isDeleting}
					className="mr-n3 align-self-center"
				>
					{this.state.isDeleting ? 'Wait…' : 'Delete'}
				</Button>
				<Modal show={this.state.show} onHide={this.handleCancel}>
					<Modal.Header closeButton>
						<Modal.Title>Are you sure?</Modal.Title>
					</Modal.Header>
					<Modal.Body>Delete "{this.state.delItemTitle}" ?</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleCancel}>
							Cancel
						</Button>
						<Button value={this.props.id} variant="danger" onClick={this.handleDeleteClick}>
							Delete
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}


class ButtonEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: false,
			show: false,
			editItemTitle: ''
		};
		this.setShow = this.setShow.bind(this);
		this.setEditing = this.setEditing.bind(this);
		this.setEditItemTitle = this.setEditItemTitle.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.editTodoInTodoList = this.editTodoInTodoList.bind(this);
	}
	
	setShow(value) {
		this.setState({show: value})
	}
	
	setEditing(value) {
		this.setState({isEditing: value})
	}
	
	setEditItemTitle(value) {
		this.setState({editItemTitle: value})
	}
	
	handleShow(e) {
		this.setEditItemTitle(e.target.parentNode.parentNode.firstChild.textContent);
		this.setShow(true);
	};
	
	handleClose() {
		this.setEditItemTitle('');
		this.setShow(false)
	}
	
	handleCancel() {
		this.handleClose();
	};
	
	handleEditClick(e) {
		this.setEditItemTitle('');
		this.setEditing(true);
		this.editTodoInTodoList(
			e.target.value,
			e.target.parentNode.parentNode.childNodes[1].firstChild.firstChild.value
		);
		this.handleClose();
	};
	
	editTodoInTodoList(id, todo) {
		axios
			.put(
				`http://127.0.0.1:8000/api/todos/${id}/`,
				{
					title: todo,
					ip_edit: this.props.ip,
				}
			)
			.finally(() => {
				this.setEditing(false);
				this.props.handleGetTodosList();
			});
	};
	
	
	render() {
		return (
			<>
				<Button
					variant="primary"
					onClick={!this.state.isEditing ? this.handleShow : null}
					value={this.props.id}
					className="mr-1 align-self-center"
				>
					Edit
				</Button>
				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Are you sure?</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<InputGroup>
							<FormControl
								value={this.state.editItemTitle}
								maxlength="255"
								defaultValue=""
								onChange={(e) => this.setEditItemTitle(e.target.value)}
							/>
						</InputGroup>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleCancel}>
							Cancel
						</Button>
						<Button value={this.props.id} variant="primary" onClick={this.handleEditClick}>
							Edit
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}


class ButtonsGroup extends React.Component {
	render() {
		return (
			<div className="ml-auto d-flex">
				<ButtonEdit
					id={this.props.id}
					ip={this.props.ip}
					handleGetTodosList={this.props.handleGetTodosList}
				/>
				<ButtonDelete
					id={this.props.id}
					handleGetTodosList={this.props.handleGetTodosList}
				/>
			</div>
		);
	}
}


class TodoRow extends React.Component {
	render() {
		const todo = this.props.todo;
		return (
			<ListGroup.Item
				className="d-flex flex-row align-content-center justify-content-center"
			>
				<OverlayTrigger
		      key='left'
		      placement='left'
		      overlay={
		        <Tooltip id="tooltip-todo" className="tooltip-todo">
		          <span>Edit: <span>{moment(todo.edit).format('LLL')}</span></span><br/>
		          <span>IP: <span>{todo.ip_edit}</span></span>
		        </Tooltip>
		      }
		    >
					<div className="align-self-center mr-2">
						{todo.title}
					</div>
				</OverlayTrigger>
				
				<ButtonsGroup
					id={todo.id}
					ip={this.props.ip}
					handleGetTodosList={this.props.handleGetTodosList}
				/>
				
			</ListGroup.Item>
		);
	}
}


class TodoAddInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isAdding: false,
			textInput: "",
		};
		this.handleChangeAddInput = this.handleChangeAddInput.bind(this);
		this.addTodoToTodoList = this.addTodoToTodoList.bind(this);
		this.setAdding = this.setAdding.bind(this);
		this.handleSubmitForm = this.handleSubmitForm.bind(this);
	}
	
	handleChangeAddInput(textInput) {
		this.setState({textInput: textInput});
	}
	
	addTodoToTodoList(todo) {
		return axios
			.post(
				'http://127.0.0.1:8000/api/todos/',
				{
					title: todo,
					ip_edit: this.props.ip,
				})
			.finally(() => {
				this.props.handleGetTodosList();
			});
	};
	
	setAdding(value) {
		this.setState({isAdding: value});
	}
	
	handleSubmitForm(event) {
		event.preventDefault();
		this.setAdding(true);
		this.addTodoToTodoList(event.target.todo.value)
			.then(() => {
				this.setAdding(false);
				this.handleChangeAddInput("");
			});
	};
	
	render() {
		return (
			<Form onSubmit={!this.state.isAdding ? this.handleSubmitForm : null}>
				<InputGroup className="mt-3 mb-5">
					<FormControl
						placeholder="Todo"
						name="todo"
						maxlength="255"
						defaultValue=""
						value={this.state.textInput}
						onChange={(e) => this.handleChangeAddInput(e.target.value)}
					/>
					<InputGroup.Append>
						<Button
							variant="success"
							type="submit"
							disabled={this.state.isAdding}
						>
							{this.state.isAdding ? 'Wait…' : 'Add'}
						</Button>
					</InputGroup.Append>
				</InputGroup>
			</Form>
		);
	}
}


class TodoTable extends React.Component {
	render() {
		const filterText = this.props.filterText;
		const rows = [];
		this.props.todo_list.forEach((todo) => {
			if (todo.title.indexOf(filterText) === -1) {
				return;
			}
			rows.push(
				<TodoRow
					todo={todo}
					key={todo.id}
					ip={this.props.ip}
					handleGetTodosList={this.props.handleGetTodosList}
				/>
			);
		});
		
		return (
			<div className="d-flex flex-column justify-content-center mt-4">
				<ListGroup variant="flush">{rows}</ListGroup>
				<TodoAddInput
					handleGetTodosList={this.props.handleGetTodosList}
					ip={this.props.ip}
				/>
			</div>
		);
	}
}


class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleSearchChange = this.handleSearchChange.bind(this);
	}
	
	handleSearchChange(e) {
		this.props.onFilterSearchChange(e.target.value);
	}
	
	render() {
		const filterText = this.props.filterText;
		
		return (
			<Navbar className="bg-light justify-content-center">
				<InputGroup className="my-1 w-50">
					<InputGroup.Prepend>
						<InputGroup.Text>
							Search:
						</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						value={filterText}
						onChange={this.handleSearchChange}
					/>
				</InputGroup>
			</Navbar>
		);
	}
}


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filterText: '',
			todo_list: [],
			isAdding: false,
			ip: null,
		};
		this.onFilterSearchChange = this.onFilterSearchChange.bind(this);
		this.clearTodoList = this.clearTodoList.bind(this);
		this.getTodoList = this.getTodoList.bind(this);
		this.getIP = this.getIP.bind(this);
	}
	
	onFilterSearchChange(filterText) {
		this.setState({filterText: filterText});
	}
	
	componentDidMount() {
		this.getTodoList();
		this.getIP();
	}
	
	componentWillUnmount() {
		this.clearTodoList();
	}
	
	clearTodoList() {
		this.setState({
			todo_list: []
		});
	}
	
	getTodoList() {
		axios
			.get('http://127.0.0.1:8000/api/todos/')
			.then((response) => {
				return response.data;
			})
			.then((todo_list) => {
				this.setState({
					todo_list: todo_list
				});
			});
	}
	
	getIP() {
		publicIp.v4()
			.then(response => response)
			.then(ip => {
				this.setState({
					ip: ip
				});
			});
	}
	
	render() {
		return (
			<div>
				<SearchBar
					filterText={this.state.filterText}
					onFilterSearchChange={this.onFilterSearchChange}
				/>
				<div className="w-50 d-flex flex-column justify-content-center m-auto">
					<TodoTable
						ip={this.state.ip}
						todo_list={this.state.todo_list}
						filterText={this.state.filterText}
						handleGetTodosList={this.getTodoList}
					/>
				</div>
				<Alert variant="light" className="footer mt-auto">
					Your IP: <span>{this.state.ip}</span>
				</Alert>
			</div>
		);
	}
}


axios.defaults.withCredentials = true
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
export default App;
