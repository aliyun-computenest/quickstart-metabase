'use strict';

import ModalContent from "metabase/components/ModalContent.react";
import SortableItemList from 'metabase/components/SortableItemList.react';

import { fetchCards, setEditingDashboard, addCardToDashboard } from "../actions";

import moment from 'moment';

export default class AddToDashSelectQuestionModal extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchCards());
    }

    onAdd(card) {
        this.props.dispatch(addCardToDashboard({ dashId: this.props.dashboard.id, cardId: card.id }));
        this.props.dispatch(setEditingDashboard(true));
        this.props.onClose();
    }

    render() {
        return (
            <ModalContent
                title="Add Question to Dashboard"
                closeFn={this.props.onClose}
            >
                <SortableItemList
                    items={this.props.cards}
                    onClickItemFn={(card) => this.onAdd(card)}
                    showIcons={true}
                />
            </ModalContent>
        );
    }
}

AddToDashSelectQuestionModal.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    dashboard: React.PropTypes.object.isRequired,
    cards: React.PropTypes.array,
    onClose: React.PropTypes.func.isRequired
};
