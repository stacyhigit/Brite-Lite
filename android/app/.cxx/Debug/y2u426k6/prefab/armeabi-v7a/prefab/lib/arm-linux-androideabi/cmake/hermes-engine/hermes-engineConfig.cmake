if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/Stacy/.gradle/caches/transforms-3/e2c6288cc5e8b3ecc9940685df93e0cc/transformed/jetified-hermes-android-0.73.6-debug/prefab/modules/libhermes/libs/android.armeabi-v7a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/Stacy/.gradle/caches/transforms-3/e2c6288cc5e8b3ecc9940685df93e0cc/transformed/jetified-hermes-android-0.73.6-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

