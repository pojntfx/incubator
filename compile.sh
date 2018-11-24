#!/bin/bash

clean_up() {
    echo "[INFO] Cleaning up ..."
    [ -e upstream/ ] && rm -r upstream/
    [ -e dist/ ] && rm -r dist/
    [ -e deps/ ] && rm -r deps/
    echo "[SUCCESS] Cleaned up."
}

get_icons() {
    echo "[INFO] Downloading icons ..."
    DEPS_DIR="${PWD}/deps/"
    mkdir -p $DEPS_DIR
    wget -q https://github.com/keeferrourke/la-capitaine-icon-theme/archive/master.zip -O $DEPS_DIR/icons.zip
    echo "[SUCCESS] Downloaded icons."
}

extract_icons() {
    echo "[INFO] Extracting icons ..."
    ICON_SRC_DIR="${PWD}/upstream/icons"
    mkdir -p $ICON_SRC_DIR
    unzip -q ${DEPS_DIR}/icons.zip -d ${ICON_SRC_DIR}
    cp -r ${ICON_SRC_DIR}/la-capitaine-icon-theme-master/* ${ICON_SRC_DIR}
    rm -rf ${ICON_SRC_DIR}/la-capitaine-icon-theme-master
    echo "[SUCCESS] Extracted icons."
}

compile_icons() {
    echo "[INFO] Compiling icons ..."
    ROOT_DIR=${PWD}
    compile_icons--light
    compile_icons--dark
    echo "[SUCCESS] Compiled icons."
}

compile_icons--light() {
    echo "[INFO] Compiling light icons ..."
    echo "[INFO] Choose \"N\" for all the following options!"
    cd $ICON_SRC_DIR && ./configure && cd $ROOT_DIR
    local DIST_DIR=$ROOT_DIR/dist/icons/macOS--light
    mkdir -p $DIST_DIR
    cp -r $ICON_SRC_DIR/* $DIST_DIR
    echo "[SUCCESS] Compiled light icons."
}

compile_icons--dark() {
    echo "[INFO] Compiling dark icons ..."
    echo "[INFO] Choose \"y\" for all the following options!"
    cd $ICON_SRC_DIR && ./configure && cd $ROOT_DIR
    local DIST_DIR=$ROOT_DIR/dist/icons/macOS--dark
    mkdir -p $DIST_DIR
    cp -r $ICON_SRC_DIR/* $DIST_DIR
    echo "[SUCCESS] Compiled dark icons."
}

install_icons() {
    echo "[INFO] Installing icons ..."
    rm -r ~/.local/share/icons/macOS--dark
    rm -r ~/.local/share/icons/macOS--light
    cp -r dist/icons/macOS--dark ~/.local/share/icons/macOS--dark
    cp -r dist/icons/macOS--light ~/.local/share/icons/macOS--light
    echo "[SUCCESS] Installed icons."
}
 
clean_up
get_icons
extract_icons
compile_icons
install_icons
clean_up