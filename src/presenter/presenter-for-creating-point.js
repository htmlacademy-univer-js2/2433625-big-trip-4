import { EDITING_BY_TYPE, BASE_POINT, ActionType } from '../mock/const.js';
import { RenderPosition, remove,render} from '../framework/render.js';
import PointEditorView from '../view/view-point-editor.js';
import CreatePointButtonView from '../view/view-create-button.js';

export default class CreatePointPresenter {
  #container = null;
  #editorContainer = null;
  #destinationsModel = null;
  #offersModel = null;

  #createButton = null;
  #pointEdit = null;
  #userAction = null;

  constructor({ container, editorContainer, destinationsModel, offersModel }) {
    this.#container = container;
    this.#editorContainer = editorContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init(onUserAction) {
    if (this.#createButton) {
      throw new Error('Cannot init create point button twice');
    }
    this.#userAction = onUserAction;
    this.#createButton = new CreatePointButtonView({ onClick: this.#createClickPointHandler });
    render(this.#createButton, this.#container);
  }

  resetView() {
    if (!this.#pointEdit) {
      return;
    }

    remove(this.#pointEdit);
    this.#pointEdit = null;

    document.removeEventListener('keydown', this.#keyDownEscHandler);

    if (this.#createButton) {
      this.setButtonDisabled(false);
    }
  }

  setButtonDisabled(disabled) {
    if (this.#createButton) {
      this.#createButton.setDisabled(disabled);
    }
  }

  triggerError() {
    this.#pointEdit.shake(() => {
      this.#pointEdit.setCreating(false);
    });
  }

  #createClickPointHandler = () => {
    if (this.#pointEdit) {
      return;
    }

    this.#pointEdit = new PointEditorView({
      point: BASE_POINT,
      destinations: this.#destinationsModel.get(),
      offers: this.#offersModel.get(),
      onCloseClick: this.#cancelHandler,
      onDeleteClick: this.#cancelHandler,
      onSubmitForm: this.#submitHandler,
      mode: EDITING_BY_TYPE.CREATING
    });

    render(this.#pointEdit, this.#editorContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#keyDownEscHandler);
    this.setButtonDisabled(true);
  };

  #cancelHandler = () => {
    this.resetView();
  };

  #keyDownEscHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.resetView();
    }
  };

  #submitHandler = async (point) => {
    this.#pointEdit.setCreating(true);
    await this.#userAction(ActionType.CREATE_POINT, point);
  };
}
