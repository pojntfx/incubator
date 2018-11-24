#!/bin/bash

clean_up() {
	echo "[INFO] Cleaning up ..."
	[ -e upstream/ ] && rm -r upstream/
	[ -e dist/ ] && rm -r dist/
	[ -e deps/ ] && rm -r deps/
	echo "[SUCCESS] Cleaned up."
}

download_icons() {
	echo "[INFO] Downloading icons ..."
	DEPS_DIR="${PWD}/deps/"
	mkdir -p $DEPS_DIR
	wget -qq https://github.com/keeferrourke/la-capitaine-icon-theme/archive/master.zip -O $DEPS_DIR/icons.zip
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
	local DIST_DIR=$ROOT_DIR/dist/icons/macOS-light
	mkdir -p $DIST_DIR
	cp -r $ICON_SRC_DIR/* $DIST_DIR
	echo "[SUCCESS] Compiled light icons."
}

compile_icons--dark() {
	echo "[INFO] Compiling dark icons ..."
	echo "[INFO] Choose \"y\" for all the following options!"
	cd $ICON_SRC_DIR && ./configure && cd $ROOT_DIR
	local DIST_DIR=$ROOT_DIR/dist/icons/macOS-dark
	mkdir -p $DIST_DIR
	cp -r $ICON_SRC_DIR/* $DIST_DIR
	echo "[SUCCESS] Compiled dark icons."
}

install_icons() {
	echo "[INFO] Installing icons ..."
	[ -e ${HOME}/.local/share/icons/macOS-dark ] && rm -r ${HOME}/.local/share/icons/macOS-dark
	[ -e ${HOME}/.local/share/icons/macOS-light ] && rm -r ${HOME}/.local/share/icons/macOS-light
	cp -r dist/icons/macOS-dark ${HOME}/.local/share/icons/macOS-dark
	cp -r dist/icons/macOS-light ${HOME}/.local/share/icons/macOS-light
	echo "[SUCCESS] Installed icons."
}

download_widget() {
	echo "[INFO] Downloading widget theme ..."
	DEPS_DIR="${PWD}/deps/"
	mkdir -p $DEPS_DIR
	wget -q https://github.com/vinceliuice/Mojave-gtk-theme/archive/master.zip -O $DEPS_DIR/widget.zip
	echo "[SUCCESS] Downloaded widget theme."
}

extract_widget() {
	echo "[INFO] Extracting widget theme ..."
	WIDGET_SRC_DIR="${PWD}/upstream/widget"
	mkdir -p $WIDGET_SRC_DIR
	unzip -q ${DEPS_DIR}/widget.zip -d ${WIDGET_SRC_DIR}
	cp -r ${WIDGET_SRC_DIR}/Mojave-gtk-theme-master/* ${WIDGET_SRC_DIR}
	rm -rf ${WIDGET_SRC_DIR}/Mojave-gtk-theme-master
	echo "[SUCCESS] Extracted widget theme."
}

compile_widget() {
	echo "[INFO] Compiling widget theme ..."
	ROOT_DIR=${PWD}
	cd $WIDGET_SRC_DIR && source parse-sass.sh >>/dev/null && cd $ROOT_DIR
	echo "[SUCCESS] Compiled widget theme."
}

inject_tweaks_into_widget() {
	echo "[INFO] Injecting tweaks into widget theme ..."
	ROOT_DIR=${PWD}
	TWEAKS_FILE=${ROOT_DIR}/src/tweaks.css
	TWEAKS_FILE_CONTENTS=$(cat $TWEAKS_FILE)
	cd $WIDGET_SRC_DIR/src/gtk-3.0/

	for file in ./*.css; do
		echo $TWEAKS_FILE_CONTENTS >>$file
	done

	cd $ROOT_DIR
	echo "[SUCCESS] Injected tweaks into widget theme."
}

install_widget() {
	echo "[INFO] Installing widget theme ..."
	cd $WIDGET_SRC_DIR && source install.sh -d "${HOME}/.local/share/themes" -n "macOS" >>/dev/null && cd $ROOT_DIR
	echo "[SUCESS] Installed widget theme."
}

clean_up
download_icons
extract_icons
compile_icons
install_icons
download_widget
extract_widget
compile_widget
inject_tweaks_into_widget
install_widget
clean_up
