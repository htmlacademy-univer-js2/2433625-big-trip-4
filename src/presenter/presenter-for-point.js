import { remove, render, replace} from '../framework/render.js';
import PointView from '../view/view-point.js';
import PointEditorView from '../view/view-point-editor.js';
import { EDITING_BY_TYPE, PointCondition, ActionType } from '../mock/const.js';

export default class PointPresenter {
  #container = null;
  #pointComponent = null;
  #pointEditorComponent = null;
  #point = null;
  #onEditorOpen = null;
  #destinationsModel = null;
  #offersModel = null;
  #mode = PointCondition.IDLE;
  #onUserAction = null;

  constructor({
    container,
    destinationsModel,
    offersModel,
    onEditorOpen,
    onUserAction,
  }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#onEditorOpen = onEditorOpen;
    this.#onUserAction = onUserAction;
  }

  init(point) {
    this.#point = point;
    this.#pointComponent = this.#pointViewCreate();
    this.#pointEditorComponent = this.#pointEditorViewCreate();
    if (this.#mode === PointCondition.EDITABLE) {
      render(this.#pointEditorComponent, this.#container);
      return;
    }

    render(this.#pointComponent, this.#container);
  }

  update(point) {
    this.#point = point;
    const updatedPointComponent = this.#pointViewCreate();
    const updatedEditorComponent = this.#pointEditorViewCreate();

    if (this.#mode === PointCondition.EDITABLE) {
      replace(updatedEditorComponent, this.#pointEditorComponent);
    } else {
      replace(updatedPointComponent, this.#pointComponent);
    }

    this.#pointComponent = updatedPointComponent;
    this.#pointEditorComponent = updatedEditorComponent;
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditorComponent);
  }

  resetView() {
    if (this.#mode !== PointCondition.IDLE) {
      this.#editorByPointReplace();
    }
  }

  triggerError() {
    if(this.#mode !== PointCondition.EDITABLE) {
      this.#pointComponent.shake();
      return;
    }

    this.#pointEditorComponent.shake(() => {
      this.#pointEditorComponent.setDeleting(false);
      this.#pointEditorComponent.setUpdating(false);
    });
  }

  #pointViewCreate() {
    return new PointView({
      point: this.#point,
      destination: this.#destinationsModel.getById(this.#point.destination),
      offers: this.#offersModel.getByType(this.#point.type),
      onEditClick: this.#editPointHandler,
      onFavoriteToggle: this.#favoritePointHandler,
    });
  }

  #pointEditorViewCreate() {
    return new PointEditorView({
      point: this.#point,
      destinations: this.#destinationsModel.get(),
      offers: this.#offersModel.get(),
      onCloseClick: this.#closePointHandler,
      onSubmitForm: this.#submitHandler,
      onDeleteClick: this.#deletePointHandler,
      mode: EDITING_BY_TYPE.EDITING,
    });
  }

  #pointByEditorReplace() {
    replace(this.#pointEditorComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#keyDownEscHandler);
    this.#mode = PointCondition.EDITABLE;
  }

  #editorByPointReplace() {
    replace(this.#pointComponent, this.#pointEditorComponent);
    document.removeEventListener('keydown', this.#keyDownEscHandler);
    this.#mode = PointCondition.IDLE;
  }

  #keyDownEscHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editorByPointReplace();
    }
  };

  #editPointHandler = () => {
    this.#onEditorOpen();
    this.#pointByEditorReplace();
  };

  #submitHandler = (point) => {
    this.#pointEditorComponent.setUpdating(true);
    this.#onUserAction(ActionType.UPDATE_POINT, point);
  };

  #deletePointHandler = (point) => {
    this.#pointEditorComponent.setDeleting(true);
    this.#onUserAction(ActionType.DELETE_POINT, point);
  };

  #closePointHandler = () => {
    this.#editorByPointReplace();
  };

  #favoritePointHandler = (isFavorite) => {
    this.#onUserAction(ActionType.UPDATE_POINT, { ...this.#point, isFavorite });
  };
}
