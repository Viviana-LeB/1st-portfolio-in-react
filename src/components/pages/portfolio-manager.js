import React, { Component } from 'react';
import axios from 'axios';

import PortfolioSidebarList from '../portfolio/portfolio-sidebar-list';
import PortfolioForm from '../portfolio/portfolio-form';

export default class PortfolioManager extends Component {
    constructor() {
        super();

        this.state = {
            portfolioItem: [],
            portfolioToEdit: {}
        };

        this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
        this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
    };

    clearPortfolioToEdit() {
        this.setState({
            portfolioToEdit: {

            }
        });
    }

    handleEditClick(PortfolioItem) {
        this.setState({
        portfolioToEdit: PortfolioItem
        });
    }

    handleDeleteClick(PortfolioItem) {
        axios.delete(
            `https://api.devcamp.space/portfolio/portfolio_items/${PortfolioItem.id}`,
            {withCredentials: true}
        ).then(response => {
            this.setState({
                portfolioItem: this.state.portfolioItem.filter(item => {
                    return item.id !== PortfolioItem.id
                })
            })
            
            return response.data
        }).catch(error => {
            console.log("handleDeleteClick erorr", error);
        })
    }

    handleEditFormSubmission() {
        this.getPortfolioItems();
    }

    handleNewFormSubmission(PortfolioItem) {
        this.setState({
            portfolioItem: [PortfolioItem].concat(this.state.portfolioItem)
        })
    }

    handleFormSubmissionError(error) {
        console.log("handleFormSubmissionError error", error)
    }

    getPortfolioItems() {
        axios.get('https://paige.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc', {
            withCredentials : true
        }).then(response => {
            this.setState({
                portfolioItem: [...response.data.portfolio_items]
            })
        }).catch(error => {
            console.log("error in getportfolioItem", error)
        })
    }

    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        return (
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                    <PortfolioForm
                        handleNewFormSubmission = {this.handleNewFormSubmission}
                        handleEditFormSubmission = {this.handleEditFormSubmission}
                        handleFormSubmissionError = {this.handleFormSubmissionError}
                        clearPortfolioToEdit = {this.clearPortfolioToEdit}
                        portfolioToEdit= {this.state.portfolioToEdit}
                    />
                </div>

                <div className="right-column">
                    <PortfolioSidebarList 
                        handleDeleteClick={this.handleDeleteClick}
                        data={this.state.portfolioItem}
                        handleEditClick={this.handleEditClick}
                         />
                </div>
            </div>
        )
    }
}