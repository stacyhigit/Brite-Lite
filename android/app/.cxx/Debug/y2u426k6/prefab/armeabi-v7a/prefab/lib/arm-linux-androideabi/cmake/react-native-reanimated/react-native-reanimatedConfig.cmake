if(NOT TARGET react-native-reanimated::reanimated)
add_library(react-native-reanimated::reanimated SHARED IMPORTED)
set_target_properties(react-native-reanimated::reanimated PROPERTIES
    IMPORTED_LOCATION "C:/Stacy/react-native/projects/publish/Brite-Lite/node_modules/react-native-reanimated/android/build/intermediates/cxx/Debug/374i1y3l/obj/armeabi-v7a/libreanimated.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Stacy/react-native/projects/publish/Brite-Lite/node_modules/react-native-reanimated/android/build/prefab-headers/reanimated"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

