import os
import streamlit.components.v1 as components

_RELEASE = True

if not _RELEASE:
    _card_selectable = components.declare_component(
        "st_cardselectable", url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _card_selectable = components.declare_component("st_cardselectable", path=build_dir)


def st_cardselectable(label, options, explanation, default=None, key=None):
    return _card_selectable(
        label = label, 
        options = options, 
        explanation = explanation, 
        default = default, 
        key = key)


if not _RELEASE:
    import streamlit as st

    result = st_cardselectable(
        label = "",
        options = ["Header 1", "Header 2"],
        explanation = ["Card text 1", "Card text 2"]
    )

    st.write(result)