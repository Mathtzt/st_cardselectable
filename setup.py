import setuptools

setuptools.setup(
    name="streamlit_cardselectable",
    version="0.0.1",
    author="Matheus Ferreira",
    author_email="matheus.cn10@gmail.com",
    url="https://github.com/Mathtzt",
    description="Card that the user can select one of the available options. It was created as an alternative to the radio button.",
    long_description=open('README.md').read(),
    long_description_content_type="text/plain",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.9",
    install_requires=[
        # By definition, a Custom Component depends on Streamlit.
        # If your component has other Python dependencies, list
        # them here.
        "streamlit >= 0.63",
    ],
)