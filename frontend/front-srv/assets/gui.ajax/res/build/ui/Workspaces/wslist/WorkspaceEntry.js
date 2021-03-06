/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */

"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _pydio = require("pydio");

var _pydio2 = _interopRequireDefault(_pydio);

var _materialUiStyles = require("material-ui/styles");

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _materialUi = require('material-ui');

var _reactDnd = require('react-dnd');

var _pydioModelNode = require("pydio/model/node");

var _pydioModelNode2 = _interopRequireDefault(_pydioModelNode);

var _pydioUtilDom = require('pydio/util/dom');

var _pydioUtilDom2 = _interopRequireDefault(_pydioUtilDom);

var _pydioHttpResourcesManager = require('pydio/http/resources-manager');

var _pydioHttpResourcesManager2 = _interopRequireDefault(_pydioHttpResourcesManager);

var _pydioModelMetaNodeProvider = require('pydio/model/meta-node-provider');

var _pydioModelMetaNodeProvider2 = _interopRequireDefault(_pydioModelMetaNodeProvider);

var _WorkspaceCard = require("./WorkspaceCard");

var _WorkspaceCard2 = _interopRequireDefault(_WorkspaceCard);

var _Pydio$requireLib = _pydio2["default"].requireLib('components');

var FoldersTree = _Pydio$requireLib.FoldersTree;
var DND = _Pydio$requireLib.DND;
var ChatIcon = _Pydio$requireLib.ChatIcon;
var Types = DND.Types;
var collectDrop = DND.collectDrop;
var nodeDropTarget = DND.nodeDropTarget;

var Badge = function Badge(_ref) {
    var children = _ref.children;
    var muiTheme = _ref.muiTheme;

    var style = {
        display: "inline-block",
        backgroundColor: muiTheme.palette.accent1Color,
        color: 'white',

        fontSize: 10,
        borderRadius: 6,
        padding: '0 5px',
        marginLeft: 5,
        height: 16,
        lineHeight: '17px',
        fontWeight: 500
    };

    return _react2["default"].createElement(
        "span",
        { style: style },
        children
    );
};

Badge = _materialUiStyles.muiThemeable()(Badge);

var Confirm = _react2["default"].createClass({
    displayName: "Confirm",

    propTypes: {
        pydio: _react2["default"].PropTypes.instanceOf(_pydio2["default"]),
        onDecline: _react2["default"].PropTypes.func,
        onAccept: _react2["default"].PropTypes.func,
        mode: _react2["default"].PropTypes.oneOf(['new_share', 'reject_accepted'])
    },

    render: function render() {
        var messages = this.props.pydio.MessageHash,
            messageTitle = messages[545],
            messageBody = messages[546],
            actions = [{ text: messages[548], ref: 'decline', onClick: this.props.onDecline }, { text: messages[547], ref: 'accept', onClick: this.props.onAccept }];
        if (this.props.mode === 'reject_accepted') {
            messageBody = messages[549];
            actions = [{ text: messages[54], ref: 'decline', onClick: this.props.onDecline }, { text: messages[551], ref: 'accept', onClick: this.props.onAccept }];
        }

        for (var key in this.props.replacements) {
            messageTitle = messageTitle.replace(new RegExp(key), this.props.replacements[key]);
            messageBody = messageBody.replace(new RegExp(key), this.props.replacements[key]);
        }

        // TODO Retest this component as Dialog replace legacy materialui dialog
        return _react2["default"].createElement(
            "div",
            { className: "react-mui-context", style: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'transparent' } },
            _react2["default"].createElement(
                _materialUi.Dialog,
                {
                    title: messageTitle,
                    actions: actions,
                    modal: false,
                    dismissOnClickAway: true,
                    onDismiss: this.props.onDismiss.bind(this),
                    open: true
                },
                messageBody
            )
        );
    }
});

var WorkspaceEntry = _react2["default"].createClass({
    displayName: "WorkspaceEntry",

    propTypes: {
        pydio: _react2["default"].PropTypes.instanceOf(_pydio2["default"]).isRequired,
        workspace: _react2["default"].PropTypes.instanceOf(Repository).isRequired,
        showFoldersTree: _react2["default"].PropTypes.bool,
        onHoverLink: _react2["default"].PropTypes.func,
        onOutLink: _react2["default"].PropTypes.func
    },

    getInitialState: function getInitialState() {
        return {
            openAlert: false,
            openFoldersTree: false,
            currentContextNode: this.props.pydio.getContextHolder().getContextNode()
        };
    },

    getLetterBadge: function getLetterBadge() {
        return { __html: this.props.workspace.getHtmlBadge(true) };
    },

    componentDidMount: function componentDidMount() {
        if (this.props.showFoldersTree) {
            this._monitorFolder = (function () {
                this.setState({ currentContextNode: this.props.pydio.getContextHolder().getContextNode() });
            }).bind(this);
            this.props.pydio.getContextHolder().observe("context_changed", this._monitorFolder);
        }
    },

    componentWillUnmount: function componentWillUnmount() {
        if (this._monitorFolder) {
            this.props.pydio.getContextHolder().stopObserving("context_changed", this._monitorFolder);
        }
    },

    handleAccept: function handleAccept() {
        this.props.workspace.setAccessStatus('accepted');
        this.handleCloseAlert();
        this.onClick();
    },

    handleDecline: function handleDecline() {
        // Switching status to decline
        this.props.workspace.setAccessStatus('declined');
        this.props.pydio.fire("repository_list_refreshed", {
            list: this.props.pydio.user.getRepositoriesList(),
            active: this.props.pydio.user.getActiveRepository()
        });
        this.handleCloseAlert();
    },

    handleOpenAlert: function handleOpenAlert(mode, event) {
        if (mode === undefined) mode = 'new_share';

        event.stopPropagation();
        this.wrapper = document.body.appendChild(document.createElement('div'));
        this.wrapper.style.zIndex = 11;
        var replacements = {
            '%%OWNER%%': this.props.workspace.getOwner()
        };
        ReactDOM.render(_react2["default"].createElement(Confirm, _extends({}, this.props, {
            mode: mode,
            replacements: replacements,
            onAccept: mode === 'new_share' ? this.handleAccept.bind(this) : this.handleDecline.bind(this),
            onDecline: mode === 'new_share' ? this.handleDecline.bind(this) : this.handleCloseAlert.bind(this),
            onDismiss: this.handleCloseAlert
        })), this.wrapper);
    },

    handleCloseAlert: function handleCloseAlert() {
        ReactDOM.unmountComponentAtNode(this.wrapper);
        this.wrapper.remove();
    },

    onClick: function onClick() {
        var _this = this;

        if (this.props.workspace.getId() === this.props.pydio.user.activeRepository && this.props.showFoldersTree) {
            this.props.pydio.goTo('/');
        } else {
            this.props.pydio.observeOnce('repository_list_refreshed', function () {
                _this.setState({ loading: false });
            });
            this.setState({ loading: true });
            this.props.pydio.triggerRepositoryChange(this.props.workspace.getId());
        }
    },

    toggleFoldersPanelOpen: function toggleFoldersPanelOpen(ev) {
        ev.stopPropagation();
        this.setState({ openFoldersTree: !this.state.openFoldersTree });
    },

    getRootItemStyle: function getRootItemStyle(node) {
        var isContext = this.props.pydio.getContextHolder().getContextNode() === node;
        var accent2 = this.props.muiTheme.palette.accent2Color;
        if (isContext) {
            return {
                borderLeft: '4px solid ' + accent2,
                paddingLeft: 12
            };
        } else {
            return {};
        }
    },

    getItemStyle: function getItemStyle(node) {
        var isContext = this.props.pydio.getContextHolder().getContextNode() === node;
        var accent2 = this.props.muiTheme.palette.accent2Color;
        if (isContext) {
            return {
                color: 'rgba(0,0,0,.77)',
                fontWeight: 500,
                backgroundColor: _color2["default"](accent2).fade(.9).toString()
            };
        }
        var isSelected = this.props.pydio.getContextHolder().getSelectedNodes().indexOf(node) !== -1;
        if (isSelected) {
            return {
                /*backgroundColor: Color(accent2).fade(.9).toString()*/
                color: accent2,
                fontWeight: 500
            };
        }
        return {};
    },

    workspacePopoverNode: function workspacePopoverNode(workspace) {
        var menuNode = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];

        if (menuNode) {
            return Promise.resolve(menuNode);
        }
        return _pydioModelMetaNodeProvider2["default"].loadRoots([workspace.getSlug()]).then(function (results) {
            if (results && results[workspace.getSlug()]) {
                return results[workspace.getSlug()];
            } else {
                var fakeNode = new _pydioModelNode2["default"]('/', false, workspace.getLabel());
                fakeNode.setRoot(true);
                fakeNode.getMetadata().set('repository_id', workspace.getId());
                fakeNode.getMetadata().set('workspaceEntry', workspace);
                return fakeNode;
            }
        });
    },

    workspacePopover: function workspacePopover(event) {
        var _this2 = this;

        var menuNode = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
        var _props = this.props;
        var pydio = _props.pydio;
        var workspace = _props.workspace;

        event.stopPropagation();
        var target = event.target;

        var offsetTop = target.getBoundingClientRect().top;
        var viewportH = _pydioUtilDom2["default"].getViewportHeight();
        var viewportW = _pydioUtilDom2["default"].getViewportWidth();
        var popoverTop = viewportH - offsetTop < 250;
        this.workspacePopoverNode(workspace, menuNode).then(function (n) {
            if (workspace.getOwner()) {
                _pydioHttpResourcesManager2["default"].loadClassesAndApply(["ShareDialog"], function () {
                    var popoverContent = _react2["default"].createElement(ShareDialog.CellCard, {
                        pydio: pydio,
                        cellId: workspace.getId(),
                        onDismiss: function () {
                            _this2.setState({ popoverOpen: false });
                        },
                        onHeightChange: function () {
                            _this2.setState({ popoverHeight: 500 });
                        },
                        editorOneColumn: viewportW < 700,
                        rootNode: n
                    });
                    _this2.setState({ popoverAnchor: target, popoverOpen: true, popoverContent: popoverContent, popoverTop: popoverTop, popoverHeight: null });
                });
            } else {
                var popoverContent = _react2["default"].createElement(_WorkspaceCard2["default"], {
                    pydio: pydio,
                    workspace: workspace,
                    rootNode: n,
                    onDismiss: function () {
                        _this2.setState({ popoverOpen: false });
                    }
                });
                _this2.setState({ popoverAnchor: target, popoverOpen: true, popoverContent: popoverContent, popoverTop: popoverTop, popoverHeight: null });
            }
        });
    },

    render: function render() {
        var _this3 = this;

        var _props2 = this.props;
        var workspace = _props2.workspace;
        var pydio = _props2.pydio;
        var onHoverLink = _props2.onHoverLink;
        var onOutLink = _props2.onOutLink;
        var showFoldersTree = _props2.showFoldersTree;

        var current = pydio.user.getActiveRepository() === workspace.getId(),
            currentClass = "workspace-entry",
            onHover = undefined,
            onOut = undefined,
            onClick = undefined,
            additionalAction = undefined,
            treeToggle = undefined;

        var style = {};

        if (current) {
            currentClass += " workspace-current";
            style = this.getRootItemStyle(pydio.getContextHolder().getContextNode());
        }
        style = _extends({ paddingLeft: 16 }, style);

        currentClass += " workspace-access-" + workspace.getAccessType();

        if (onHoverLink) {
            onHover = (function (event) {
                onHoverLink(event, workspace);
            }).bind(this);
        }

        if (onOutLink) {
            onOut = (function (event) {
                onOutLink(event, workspace);
            }).bind(this);
        }

        onClick = this.onClick;
        var chatIcon = undefined;

        var accent2 = this.props.muiTheme.palette.accent2Color;
        var icon = "mdi mdi-folder";
        var iconStyle = {
            fontSize: 20,
            marginRight: 10,
            opacity: 0.3
        };
        if (workspace.getRepositoryType() === "workspace-personal") {
            icon = "mdi mdi-folder-account";
        } else if (workspace.getRepositoryType() === "cell") {
            icon = "icomoon-cells";
            iconStyle = _extends({}, iconStyle, { fontSize: 22 });
        }

        var menuNode = undefined;
        var popoverNode = undefined;
        if (current) {
            menuNode = pydio.getContextHolder().getRootNode();
            if (showFoldersTree) {
                if (menuNode.isLoading()) {
                    menuNode.observeOnce("loaded", function () {
                        _this3.forceUpdate();
                    });
                }
                var children = menuNode.getChildren();
                var hasFolders = false;
                children.forEach(function (c) {
                    if (!c.isLeaf()) {
                        hasFolders = true;
                    }
                });
                if (hasFolders) {
                    var toggleIcon = this.state.openFoldersTree ? "mdi mdi-chevron-down" : "mdi mdi-chevron-right";
                    treeToggle = _react2["default"].createElement("span", { style: { opacity: .3 }, className: 'workspace-additional-action ' + toggleIcon,
                        onClick: this.toggleFoldersPanelOpen });
                }
            }
            iconStyle.opacity = 1;
            iconStyle.color = accent2;
            popoverNode = menuNode;
        } else {
            menuNode = new _pydioModelNode2["default"]('/', false, workspace.getLabel());
            menuNode.setRoot(true);
            menuNode.getMetadata().set('repository_id', workspace.getId());
            menuNode.getMetadata().set('workspaceEntry', workspace);
        }

        var _state = this.state;
        var popoverOpen = _state.popoverOpen;
        var popoverAnchor = _state.popoverAnchor;
        var popoverTop = _state.popoverTop;
        var popoverHeight = _state.popoverHeight;
        var loading = _state.loading;

        if (loading) {
            additionalAction = _react2["default"].createElement(_materialUi.CircularProgress, { size: 20, thickness: 2, style: { marginTop: 2, marginRight: 6, opacity: .5 } });
        } else {
            var addStyle = popoverOpen ? { opacity: 1 } : {};
            if (popoverOpen) {
                style = _extends({}, style, { backgroundColor: 'rgba(133, 133, 133, 0.1)' });
            }
            additionalAction = _react2["default"].createElement("span", {
                className: "workspace-additional-action with-hover mdi mdi-dots-vertical",
                onClick: function (e) {
                    return _this3.workspacePopover(e, popoverNode);
                },
                style: addStyle
            });
        }

        if (workspace.getOwner()) {
            if (!pydio.getPluginConfigs("action.advanced_settings").get("GLOBAL_DISABLE_CHATS")) {
                chatIcon = _react2["default"].createElement(ChatIcon, { pydio: pydio, roomType: 'WORKSPACE', objectId: workspace.getId() });
            }
        }

        var title = workspace.getLabel();
        if (workspace.getDescription()) {
            title += ' - ' + workspace.getDescription();
        }
        var entryIcon = _react2["default"].createElement("span", { className: icon, style: iconStyle });
        var wsBlock = _react2["default"].createElement(
            ContextMenuWrapper,
            {
                node: menuNode,
                className: currentClass,
                onClick: onClick,
                onMouseOver: onHover,
                onMouseOut: onOut,
                style: style
            },
            entryIcon,
            _react2["default"].createElement(
                "span",
                { className: "workspace-label", title: title },
                workspace.getLabel()
            ),
            chatIcon,
            treeToggle,
            _react2["default"].createElement("span", { style: { flex: 1 } }),
            additionalAction,
            _react2["default"].createElement(
                _materialUi.Popover,
                {
                    open: popoverOpen,
                    anchorEl: popoverAnchor,
                    useLayerForClickAway: true,
                    autoCloseWhenOffScreen: false,
                    canAutoPosition: true,
                    onRequestClose: function () {
                        _this3.setState({ popoverOpen: false });
                    },
                    anchorOrigin: { horizontal: "right", vertical: popoverTop ? "bottom" : "center" },
                    targetOrigin: { horizontal: "left", vertical: popoverTop ? "bottom" : "center" },
                    zDepth: 3,
                    style: { overflow: 'hidden', borderRadius: 10, height: popoverHeight }
                },
                this.state.popoverContent
            )
        );

        if (showFoldersTree) {
            return _react2["default"].createElement(
                "div",
                null,
                wsBlock,
                _react2["default"].createElement(FoldersTree, {
                    pydio: pydio,
                    dataModel: pydio.getContextHolder(),
                    className: this.state.openFoldersTree ? "open" : "closed",
                    draggable: true,
                    getItemStyle: this.getItemStyle
                })
            );
        } else {
            return wsBlock;
        }
    }

});

var ContextMenuWrapper = function ContextMenuWrapper(props) {
    var canDrop = props.canDrop;
    var isOver = props.isOver;
    var connectDropTarget = props.connectDropTarget;

    var className = props.className || '';
    if (canDrop && isOver) {
        className += ' droppable-active';
    }
    return _react2["default"].createElement("div", _extends({}, props, {
        className: className,
        ref: function (instance) {
            var node = ReactDOM.findDOMNode(instance);
            if (typeof connectDropTarget === 'function') connectDropTarget(node);
        }
    }));
};
//ContextMenuWrapper = withContextMenu(ContextMenuWrapper)
ContextMenuWrapper = _reactDnd.DropTarget(Types.NODE_PROVIDER, nodeDropTarget, collectDrop)(ContextMenuWrapper);
exports["default"] = WorkspaceEntry = _materialUiStyles.muiThemeable()(WorkspaceEntry);

exports["default"] = WorkspaceEntry;
module.exports = exports["default"];
